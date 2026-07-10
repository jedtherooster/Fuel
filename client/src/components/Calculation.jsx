import React from "react";

function Calculation() {
  return (
    <div className="calc-container">
      <div className="calc-title">
        <h2>Trip Calculator</h2>
        <p>Calculate fuel costs for your journey</p>
      </div>
      <div className="calc-results-card">
        <div className="inputs-container">
          <div className="fuel-types-container">
            <div className="fuel-card selected">
              <h3>91</h3>
              <p>0.00</p>
            </div>
            <div className="fuel-card">
              <h3>95</h3>
              <p>0.00</p>
            </div>
            <div className="fuel-card">
              <h3>98</h3>
              <p>0.00</p>
            </div>
            <div className="fuel-card">
              <h3>Diesel</h3>
              <p>0.00</p>
            </div>
          </div>
          <div className="trip-info-container">
            <div className="input-container">
              <input type="number" placeholder="Fuel Economy" step="0.1" />
              <span className="unit">L/100km</span>
            </div>
            <div className="input-container">
              <input type="number" placeholder="Trip Distance" step="0.1" />
              <span className="unit">km</span>
            </div>
          </div>
        </div>

        <div className="results-container">
          <div className="required-fuel">
            <span className="results-stext">Fuel Required</span>
            <span>--</span>
          </div>
          <div className="price-per-litre">
            <span className="results-stext">Price Per Litre</span>
            <span>--</span>
          </div>
          <div className="total-cost">
            <span>Total Cost</span>
            <span>--</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculation;
