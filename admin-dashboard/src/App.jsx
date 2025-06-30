import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import MainLayout from './component/MainLayout';


const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

export default App;

