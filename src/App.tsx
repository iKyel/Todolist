import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="wrapper">
      {/* Navigation */}
      <NavBar />
      {/* End Navigation */}
      <HomePage />
    </div>
  );
}

export default App;
