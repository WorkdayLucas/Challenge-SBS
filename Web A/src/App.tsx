import React from 'react';
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Products from './components/Products';

import BottomNavigation from '@mui/material/BottomNavigation';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Home/>
      <footer>
        <p>Lucas Emanuel Montero, date deploy: 15/08/2022</p>
      </footer>
    </div>
  );
}

export default App;
