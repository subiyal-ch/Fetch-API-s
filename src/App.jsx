// App.js
import React from "react";
import ProductButton from "./components/ProductButton";
import "./App.css"; // Importing the global CSS file for styling

function App() {
  return (
    <div className="App">
      <div className="header-container">
        <h1>E-commerce Application</h1>
        <ProductButton />
      </div>
    </div>
  );
}

export default App;
