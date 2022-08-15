import React from 'react';
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Products from './components/Products';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Home/>
    </div>
  );
}

export default App;
