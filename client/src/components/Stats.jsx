import React, { useState } from "react";
import FuelPurchaseModal from "./FuelPurchaseModal";
import ArrowUpIcon from "../assets/arrow-up-right.svg?react";

function Statistics() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <FuelPurchaseModal onClose={() => setIsModalOpen(false)} />
      )}
      <div className="card-container">
        <div className="card-title-button-container">
          <div className="card-title">
            <h2>Statistics</h2>
            <p>See how well your vehicle is performing</p>
          </div>
          <div
            className="card-button button"
            onClick={() => setIsModalOpen(true)}
          >
            <p className="card-plus-icon">+</p>
            <p>Add Purchase</p>
          </div>
        </div>
        <div className="card">
          <ArrowUpIcon className="icon"></ArrowUpIcon>
          <h6>No fuel purchases logged yet</h6>
          <p>Start tracking your fuel spending to see trends and insights</p>
        </div>
      </div>
    </>
  );
}

export default Statistics;
