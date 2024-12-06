import React from 'react';

const AnnoyingPopup = ({ closePopup }) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: `${Math.random() * 80}vh`,
                left: `${Math.random() * 80}vw`,
                backgroundColor: '#ff4444',
                padding: '20px',
                borderRadius: '10px',
                zIndex: 1000,
                boxShadow: '0 0 10px black',
            }}
        >
            <p>Voulez-vous vraiment continuer ? 😈</p>
            <button onClick={closePopup}>NON</button>
        </div>
    );
};

export default AnnoyingPopup;
