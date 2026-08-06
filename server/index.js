const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000;

app.use(cors());

const DEFAULT_FUEL_DATA = {
  fuel91: 2.81,
  fuel95: 2.99,
  fuel98: 3.16,
  diesel: 2.32,
};

let fuelCache = { ...DEFAULT_FUEL_DATA };
let lastRefresh = 0;
let refreshPromise = null;
const REFRESH_INTERVAL_MS = 15 * 60 * 1000;

const normalizeFuelData = (data) => ({
  fuel91: Number(data.fuel91 ?? data["91"] ?? data[91] ?? data["91"] ?? 0) || 0,
  fuel95: Number(data.fuel95 ?? data["95"] ?? data[95] ?? data["95"] ?? 0) || 0,
  fuel98: Number(data.fuel98 ?? data["98"] ?? data[98] ?? data["98"] ?? 0) || 0,
  diesel:
    Number(data.diesel ?? data.Diesel ?? data["Diesel"] ?? 0) || 0,
});

async function scrapeFuelData() {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();

    await page.goto("https://www.gaspy.nz/stats.html", {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector("#data-average-91", { visible: true });

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
    await browser.close();
  }
}

async function refreshFuelCache() {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const scrapedData = await scrapeFuelData();
      const normalized = normalizeFuelData(scrapedData);
      fuelCache = { ...fuelCache, ...normalized };
      lastRefresh = Date.now();
      console.log("Fuel cache refreshed", fuelCache);
    } catch (error) {
      console.error("Fuel cache refresh failed:", error);
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

refreshFuelCache().catch(() => {});
setInterval(() => {
  refreshFuelCache().catch(() => {});
}, REFRESH_INTERVAL_MS);

app.get("/retrieve-fuel-data", async (req, res) => {
  const isFresh = Date.now() - lastRefresh < REFRESH_INTERVAL_MS;
  if (!lastRefresh) {
    await refreshFuelCache();
  } else if (!isFresh) {
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
