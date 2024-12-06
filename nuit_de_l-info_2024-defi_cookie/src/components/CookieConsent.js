import React, { useState } from 'react';
import './CookieConsent.css';
import CookieButton from './CookieButton';

const CookieConsent = ({ onAccept }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isAccepted, setIsAccepted] = useState(false);
    const [refusePosition, setRefusePosition] = useState({ top: '60%', left: '50%' });

    const moveRefuseButton = () => {
        const newTop = Math.random() * 80 + 10; // Entre 10% et 90% de la height
        const newLeft = Math.random() * 80 + 10; // Entre 10% et 90% de la width
        setRefusePosition({ top: `${newTop}%`, left: `${newLeft}%` });
    };

    const handleAccept = () => {
        onAccept();
        setIsAccepted(true);
        setIsVisible(false);
    };

    const handleRefuse = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null; // Si la popup est fermée on n'arfiche rien

    return (
        <div className="cookie-consent">
            <h3>Consentement aux cookies</h3>
            <p>
                Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous
                pouvez choisir d'accepter ou de refuser.
            </p>
            <div className="buttons-container">
                {/* Bouton Accepter */}
                <button className="accept-button" onClick={handleAccept}>
                    Accepter
                </button>

            </div>
        </div>
    );
};

export default CookieConsent;
