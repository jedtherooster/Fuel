const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000;

// Enable CORS so the React frontend running on port 5173 can query this server
app.use(cors());

// Default hardcoded fallback data in case scraping fails or times out
const DEFAULT_FUEL_DATA = {
  fuel91: 2.81,
  fuel95: 2.99,
  fuel98: 3.16,
  diesel: 2.32,
};

// In-memory cache variables to store scrape results and avoid spamming external sites
let fuelCache = { ...DEFAULT_FUEL_DATA };
let lastRefresh = 0;
let refreshPromise = null; // Stores ongoing scrape request to deduplicate concurrent requests
const REFRESH_INTERVAL_MS = 15 * 60 * 1000; // 15-minute cache lifespan

// Sanitizes raw scraped data to ensure numbers are valid floats and keys conform to expected API format
const normalizeFuelData = (data) => ({
  fuel91: Number(data.fuel91 ?? data["91"] ?? data[91] ?? data["91"] ?? 0) || 0,
  fuel95: Number(data.fuel95 ?? data["95"] ?? data[95] ?? data["95"] ?? 0) || 0,
  fuel98: Number(data.fuel98 ?? data["98"] ?? data[98] ?? data["98"] ?? 0) || 0,
  diesel: Number(data.diesel ?? data.Diesel ?? data["Diesel"] ?? 0) || 0,
});

// Headless browser task to extract real-time average prices from Gaspy
async function scrapeFuelData() {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();

    // Wait until network activity settles to ensure dynamic DOM content is fully loaded
    await page.goto("https://www.gaspy.nz/stats.html", {
      waitUntil: "networkidle2",
    });

    // Ensure DOM element is visible before attempting evaluation
    await page.waitForSelector("#data-average-91", { visible: true });

    // Execute DOM parsing directly inside the headless browser context
    return await page.evaluate(() => {
      const parsePrice = (selector) => {
        const raw = document.querySelector(selector)?.innerText || "";
        return parseFloat(raw.replace("$", "")) || 0;
      };

      return {
        fuel91: parsePrice("#data-average-91"),
        fuel95: parsePrice("#data-average-95"),
        fuel98: parsePrice("#data-average-98"),
        diesel: parsePrice("#data-average-diesel"),
      };
    });
  } finally {
    // Guarantees browser process is killed even if scraping throws an error
    await browser.close();
  }
}

// Manages async cache refresh with request locking to prevent duplicate background browser spawns
async function refreshFuelCache() {
  // If a scrape is already running, return the existing active promise
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const scrapedData = await scrapeFuelData();
      const normalized = normalizeFuelData(scrapedData);

      // Update cache in-place and log timestamp
      fuelCache = { ...fuelCache, ...normalized };
      lastRefresh = Date.now();
      console.log("Fuel cache refreshed", fuelCache);
    } catch (error) {
      console.error("Fuel cache refresh failed:", error);
    } finally {
      // Release lock once complete
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// Initial warm-up scrape when server boots
refreshFuelCache().catch(() => {});

// Background worker timer to keep cache reasonably fresh every 15 minutes
setInterval(() => {
  refreshFuelCache().catch(() => {});
}, REFRESH_INTERVAL_MS);

// GET Endpoint - Implements a Stale-While-Revalidate caching strategy
app.get("/retrieve-fuel-data", async (req, res) => {
  const isFresh = Date.now() - lastRefresh < REFRESH_INTERVAL_MS;

  if (!lastRefresh) {
    // Block first-ever request if cache has zero data
    await refreshFuelCache();
  } else if (!isFresh) {
    // Trigger background refresh non-blockingly if data is stale, returning cached data immediately to keep UI fast
    refreshFuelCache().catch(() => {});
  }

  res.json({
    ...fuelCache,
    lastUpdated: lastRefresh,
    stale: !isFresh,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
