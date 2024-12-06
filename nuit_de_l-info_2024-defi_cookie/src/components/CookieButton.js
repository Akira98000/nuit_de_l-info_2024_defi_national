import React, { useState } from 'react';
import './CookieButton.css';

const CookieButton = ({ onClick }) => {
    const [position, setPosition] = useState({ top: '50%', left: '50%' });

    const moveButton = () => {
        const newTop = Math.random() * 80 + 10; // Position random entre 10% et 90%
        const newLeft = Math.random() * 80 + 10; // Pareil pour la gauche
        setPosition({ top: `${newTop}%`, left: `${newLeft}%` });
    };

    return (
        <button
            className="cookie-button"
            style={{ position: 'absolute', ...position }}
            onMouseEnter={moveButton} 
        >
            Refuser
        </button>
    );
};


export default CookieButton;
