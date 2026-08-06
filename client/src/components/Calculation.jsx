import React, { useState, useEffect } from "react";
import axios from "axios";

function Calculation() {
  const FUEL_TYPES = [
    { id: "fuel91", label: "91" },
    { id: "fuel95", label: "95" },
    { id: "fuel98", label: "98" },
    { id: "diesel", label: "Diesel" },
  ];

  // Hardcoded numbers to fallback on if the server connection fails.
  const [fuelPrice, setFuelPrice] = useState({
    fuel91: 2.81,
    fuel95: 2.99,
    fuel98: 3.16,
    diesel: 2.32,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [activeFuel, setActiveFuel] = useState("fuel91");

  // State for user inputs (stored as strings to allow typing decimals smoothly)
  const [fuelEconomy, setFuelEconomy] = useState("");
  const [distance, setDistance] = useState("");

  useEffect(() => {
    let retryTimer = null;
    // Flag prevents memory leaks by checking if the component is still rendered before updating state asynchronously
    let isMounted = true;

    // Normalizes different backend payload formats (e.g., "91" vs "fuel91") to prevent UI crashes on key mismatch
    const mapFuelResponse = (apiData, prevPrice) => ({
      fuel91:
        apiData.fuel91 ?? apiData["91"] ?? apiData[91] ?? prevPrice.fuel91,
      fuel95:
        apiData.fuel95 ?? apiData["95"] ?? apiData[95] ?? prevPrice.fuel95,
      fuel98:
        apiData.fuel98 ?? apiData["98"] ?? apiData[98] ?? prevPrice.fuel98,
      diesel:
        apiData.diesel ??
        apiData.Diesel ??
        apiData["Diesel"] ??
        prevPrice.diesel,
    });

    const fetchFuelPrices = async (attempt = 1) => {
      if (!isMounted) return;

      // Only show main loading state on initial request so retry attempts happen silently in the background
      if (attempt === 1) {
        setLoading(true);
        setError(null);
      }

      try {
        const baseUrl = import.meta.env.VITE_API_URL || "";
        const response = await axios.get(`${baseUrl}/retrieve-fuel-data`);
        if (response?.data) {
          // Use functional state updates so we merge against current state safely
          setFuelPrice((prevPrice) =>
            mapFuelResponse(response.data, prevPrice),
          );
          setError(null);
          setLoading(false);
        }
      } catch (fetchError) {
        // Automatic retry logic: attempts up to 3 times before displaying error state
        if (attempt < 3) {
          retryTimer = window.setTimeout(
            () => fetchFuelPrices(attempt + 1),
            5000,
          );
          return;
        }

        if (!isMounted) return;

        // Fallback gracefully to standard hardcoded prices if server connection fails completely
        setError(
          "Unable to load fuel prices from the backend. Using default values.",
        );
        setLoading(false);
        console.error(fetchError);
      }
    };

    fetchFuelPrices();

    // Clean up timeout timers and unmount flags when component unmounts
    return () => {
      isMounted = false;
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
    };
  }, []);

  // Safely parse user input numbers, defaulting to 0 if input is empty, non-numeric, or backspaced
  const economyNum = parseFloat(fuelEconomy) || 0;
  const distanceNum = parseFloat(distance) || 0;
  const selectedPrice = fuelPrice[activeFuel] || 0;

  // Mathematical Calculations
  const fuelRequired = (distanceNum / 100) * economyNum;
  const totalCost = fuelRequired * selectedPrice;

  return (
    <div className="calc-container">
      <div className="calc-title">
        <h2>Trip Calculator</h2>
        <p>Calculate fuel costs for your journey</p>
        {loading && (
          <p className="status-message">Loading latest fuel prices...</p>
        )}
        {error && <p className="status-message error">{error}</p>}
      </div>
      <div className="calc-results-card">
        <div className="inputs-container">
          <div className="fuel-types-container">
            {/* Array Iteration Loop */}
            {FUEL_TYPES.map((fuel) => {
              const isSelected = activeFuel === fuel.id;
              const price = fuelPrice[fuel.id] || 0;

              return (
                <div
                  key={fuel.id}
                  className={`fuel-card ${isSelected ? "selected" : ""}`}
                  onClick={() => setActiveFuel(fuel.id)}
                >
                  <h3>{fuel.label}</h3>
                  <p>${price.toFixed(2)}</p>
                </div>
              );
            })}
          </div>

          <div className="trip-info-container">
            <div className="input-container">
              <input
                type="number"
                placeholder="Fuel Economy"
                step="0.1"
                value={fuelEconomy}
                onChange={(e) => setFuelEconomy(e.target.value)}
              />
              <span className="unit">L/100km</span>
            </div>
            <div className="input-container">
              <input
                type="number"
                placeholder="Trip Distance"
                step="0.1"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
              <span className="unit">km</span>
            </div>
          </div>
        </div>

        {/* Dynamic Results Display */}
        <div className="results-container">
          <div className="required-fuel">
            <span className="results-stext">Fuel Required</span>
            <span>
              {fuelRequired > 0 ? `${fuelRequired.toFixed(2)} L` : "--"}
            </span>
          </div>
          <div className="price-per-litre">
            <span className="results-stext">Price Per Litre</span>
            <span>${selectedPrice.toFixed(2)}</span>
          </div>
          <div className="total-cost">
            <span>Total Cost</span>
            <span>{totalCost > 0 ? `$${totalCost.toFixed(2)}` : "$0.00"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculation;
