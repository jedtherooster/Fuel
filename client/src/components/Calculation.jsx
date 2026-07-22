import React, { useState } from "react";

function Calculation() {
  const [fuelPrice, setFuelPrice] = useState({
    fuel91: 2.81,
    fuel95: 2.99,
    fuel98: 3.16,
    diesel: 2.32,
  });

  const [activeFuel, setActiveFuel] = useState("fuel91");

  // State for user inputs (stored as strings to allow typing decimals smoothly)
  const [fuelEconomy, setFuelEconomy] = useState("");
  const [distance, setDistance] = useState("");

  // Safely parse numbers (defaults to 0 if input is empty or invalid)
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
      </div>
      <div className="calc-results-card">
        <div className="inputs-container">
          <div className="fuel-types-container">
            {/* 91 Fuel Card */}
            <div
              className={`fuel-card ${activeFuel === "fuel91" ? "selected" : ""}`}
              onClick={() => setActiveFuel("fuel91")}
            >
              <h3>91</h3>
              <p>${fuelPrice.fuel91.toFixed(2)}</p>
            </div>

            {/* 95 Fuel Card */}
            <div
              className={`fuel-card ${activeFuel === "fuel95" ? "selected" : ""}`}
              onClick={() => setActiveFuel("fuel95")}
            >
              <h3>95</h3>
              <p>${fuelPrice.fuel95.toFixed(2)}</p>
            </div>

            {/* 98 Fuel Card */}
            <div
              className={`fuel-card ${activeFuel === "fuel98" ? "selected" : ""}`}
              onClick={() => setActiveFuel("fuel98")}
            >
              <h3>98</h3>
              <p>${fuelPrice.fuel98.toFixed(2)}</p>
            </div>

            {/* Diesel Fuel Card */}
            <div
              className={`fuel-card ${activeFuel === "diesel" ? "selected" : ""}`}
              onClick={() => setActiveFuel("diesel")}
            >
              <h3>Diesel</h3>
              <p>${fuelPrice.diesel.toFixed(2)}</p>
            </div>
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
