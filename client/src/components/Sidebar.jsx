import React from "react";
import logoSVG from "../assets/fuel-pump-fill.svg";
import CalculatorIcon from "../assets/calculator-fill.svg?react";
import VehicleIcon from "../assets/car-front-fill.svg?react";
import StatisticsIcon from "../assets/graph-up-arrow.svg?react";

function Sidebar({ activePage, onPageChange }) {
  return (
    <div className="sidebar-container">
      <div className="sidebar-logo-container">
        <div className="sidebar-image">
          <img src={logoSVG} alt="Fuel pump app logo" draggable="false" />
        </div>
        <div className="sidebar-title">
          <h1>Fuel Calculator</h1>
        </div>
      </div>
      <div className="sidebar-button-container">
        <div
          className={`sidebar-calculator button ${activePage === "calculator" ? "selected" : ""}`}
          onClick={() => onPageChange("calculator")}
        >
          <CalculatorIcon className="icon"></CalculatorIcon>
          <p>Calculator</p>
        </div>
        <div
          className={`sidebar-stats button ${activePage === "statistics" ? "selected" : ""}`}
          onClick={() => onPageChange("statistics")}
        >
          <StatisticsIcon className="icon"></StatisticsIcon>
          <p>Statistics</p>
        </div>
        <div
          className={`sidebar-vehicles button ${activePage === "vehicles" ? "selected" : ""}`}
          onClick={() => onPageChange("vehicles")}
        >
          <VehicleIcon className="icon"></VehicleIcon>
          <p>Vehicles</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
