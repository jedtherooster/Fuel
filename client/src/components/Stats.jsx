import React from "react";
import ArrowUpIcon from "../assets/arrow-up-right.svg?react";

function Statistics() {
  return (
    <>
      <div className="stats-container">
        <div className="stats-title-button-container">
          <div className="stats-title">
            <h2>Statistics</h2>
            <p>See how well your vehicle is performing</p>
          </div>
          <div className="stats-button button">
            <p className="stats-plus-icon">+</p>
            <p>Add Purchase</p>
          </div>
        </div>
        <div className="stats-card">
          <ArrowUpIcon className="icon"></ArrowUpIcon>
          <h6>No fuel purchases logged yet</h6>
          <p>Start tracking your fuel spending to see trends and insights</p>
        </div>
      </div>
    </>
  );
}

export default Statistics;
