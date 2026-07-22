import React from "react";
import VehicleIcon from "../assets/car-front-fill.svg?react";

function Vehicles() {
  return (
    <div className="card-container">
      <div className="card-title-button-container">
        <div className="card-title">
          <h2>Vehicles</h2>
          <p>Manage your veheicles</p>
        </div>
        <div className="card-button button">
          <p className="card-plus-icon">+</p>
          <p>Add Vehicle</p>
        </div>
      </div>
      <div className="card">
        <VehicleIcon className="icon"></VehicleIcon>
        <h6>No current vehicles</h6>
        <p>Manage veheicle fuel consumption</p>
      </div>
    </div>
  );
}

export default Vehicles;
