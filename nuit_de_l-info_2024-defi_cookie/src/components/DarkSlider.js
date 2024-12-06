import React, { useState } from 'react';

const DarkSlider = () => {
    const [value, setValue] = useState(0);

    const handleChange = (e) => {
        const randomOffset = Math.random() * 20 - 10;
        setValue(Math.max(0, Math.min(100, e.target.value - randomOffset)));
    };

    return (
        <div style={{ margin: '20px' }}>
            <label>Tente d'ajuster le slider :</label>
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleChange}
                style={{
                    width: '80%',
                    margin: '10px 0',
                    background: 'linear-gradient(90deg, red, yellow, green)',
                }}
            />
            <p>Valeur actuelle (jamais précise) : {value.toFixed(1)}</p>
        </div>
    );
};

export default DarkSlider;
