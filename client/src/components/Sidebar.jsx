import React from "react";
import logo from "../assets/fuel-pump-fill.svg";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-logo-container">
        <div className="sidebar-image">
          <img src={logo} alt="Fuel pump app logo" draggable="false" />
        </div>
        <div className="sidebar-title">
          <h1>Fuel Calculator</h1>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
