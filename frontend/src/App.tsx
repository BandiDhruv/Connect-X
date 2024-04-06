import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './Pages/home';
import { Login } from './Pages/login';
import { Signup } from './Pages/signup';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
        </Routes>
      </div>
    </Router>
  );  
}

export default App;