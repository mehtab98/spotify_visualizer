import React from 'react';
import './App.css';
import Header from './Header.js' 
import Sidebar from './Sidebar.js'
import Analysis from './Analysis.js'

function App() {
  return (
    <div className="app">
      <Header></Header>

      <div className="page-content">

        <Sidebar></Sidebar>

        <Analysis></Analysis>


      </div>

    </div>
  );
}

  
export default App;








