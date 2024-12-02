import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Books />} />
      </Routes>
    </Router>
  );
}

export default App;
