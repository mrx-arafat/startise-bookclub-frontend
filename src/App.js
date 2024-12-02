import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Books from "./pages/Books";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Books />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
