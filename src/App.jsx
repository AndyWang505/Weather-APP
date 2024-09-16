import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import Login from "./pages/Login"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
