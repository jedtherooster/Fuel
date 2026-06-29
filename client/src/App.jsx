// client/src/App.jsx
import React, { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Calculation from "./components/Calculation.jsx";
import Statistics from "./components/Stats.jsx";
import Vehicles from "./components/Vehicles.jsx";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("calculator");

  return (
    <div className="app-container">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />

      <main className="content-container">
        {activePage === "calculator" && <Calculation />}
        {activePage === "statistics" && <Statistics />}
        {activePage === "vehicles" && <Vehicles />}
      </main>
    </div>
  );
}

export default App;
