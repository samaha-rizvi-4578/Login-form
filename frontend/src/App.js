import React from "react";
import Login from "./login"; // Import the Login component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./signup"; // Import the Signup component
import Home from "./home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
