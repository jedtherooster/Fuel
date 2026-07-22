import React from "react";

function FuelPurchaseModal() {
  return (
    <>
      <div className="modal-container">
        <div className="card modal">
          <h5 className="modal-title">Add Fuel Purchase</h5>
          <div className="modal-inputs">
            <form>
              <label htmlFor="vehicle">Vehicle</label>
              <select name="vehicle" id="vehicle">
                <option value="car">Car</option>
              </select>
              <label htmlFor="fuel-type">Fuel Type</label>
              <select name="fuel-type" id="fuel-type">
                <option value="91">91</option>
                <option value="95">95</option>
                <option value="98">98</option>
                <option value="diesel">Diesel</option>
              </select>
              <label htmlFor="amount-spent">Amount Spent</label>
              <input type="number" name="amount-spent" id="amount-spent" />
              <label htmlFor="date">Date</label>
              <input type="date" />
              <div className="modal-buttons">
                <div className="cancel-button button">Cancel</div>
                <div className="purchase-button button">Add Purchase</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FuelPurchaseModal;
