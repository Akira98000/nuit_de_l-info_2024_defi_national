import React, { useState } from 'react';
import CookieButton from './components/CookieButton';
import DarkSlider from './components/DarkSlider';
import AnnoyingPopup from './components/AnnoyingPopup';
import CookieConsent from './components/CookieConsent';

function App() {
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const incrementScore = () => {
    setScore((prevScore) => {
      const newScore = prevScore + 1;

      if (Math.random() > 0.8) {
        setShowPopup(true);
      }
      return newScore;
    });
  };

  return (
    <div className="App" style={{ textAlign: 'center' }}>
      <h1>Bienvenue au Cookie Cauchemar 🍪</h1>
      <p>Score actuel : {score}</p>

      {/* Bouton du cookie */}
      <CookieButton onClick={incrementScore} />

      <CookieConsent />

      {/* Slider Chaotique */}
      <DarkSlider />

      {/* Popup en fonction de la probabilité */}
      {showPopup && <AnnoyingPopup closePopup={() => setShowPopup(false)} />}
    </div>
  );
}

export default App;
