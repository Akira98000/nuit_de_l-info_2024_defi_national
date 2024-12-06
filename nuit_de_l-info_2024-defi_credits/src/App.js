import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/js/Home';
import Credits from './components/js/Credits';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/credits" element={<Credits />} />
        </Routes>
      </Router>
  );
};

export default App;
