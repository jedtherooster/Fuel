import React from "react";
import logoSVG from "../assets/fuel-pump-fill.svg";
import CalculatorIcon from "../assets/calculator-fill.svg?react";
import VehicleIcon from "../assets/car-front-fill.svg?react";
import StatisticsIcon from "../assets/graph-up-arrow.svg?react";

function Sidebar() {
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
        <div className="sidebar-calculator button selected">
          <CalculatorIcon className="icon"></CalculatorIcon>
          <p>Calculator</p>
        </div>
        <div className="sidebar-stats button">
          <StatisticsIcon className="icon"></StatisticsIcon>
          <p>Statistics</p>
        </div>
        <div className="sidebar-vehicles button">
          <VehicleIcon className="icon"></VehicleIcon>
          <p>Vehicles</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
