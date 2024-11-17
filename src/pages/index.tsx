import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Wallet from './Wallet/Wallet';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/carteira" element={ <Wallet /> } />
    </Routes>
  );
}

export default App;
