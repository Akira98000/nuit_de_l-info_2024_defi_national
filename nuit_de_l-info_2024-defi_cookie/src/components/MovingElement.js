// src/components/MovingElements.js
import React from 'react';
import { motion } from 'framer-motion';

const MovingElements = () => {
    return (
        <div>
            <motion.div
                animate={{
                    x: [0, 100, -100, 0],
                    y: [0, -50, 50, 0],
                    rotate: [0, 360, 0],
                    scale: [1, 1.5, 1],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                }}
                style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'purple',
                    borderRadius: '50%',
                    margin: '10px',
                }}
            />
            <motion.div
                animate={{
                    x: [0, -50, 50, 0],
                    y: [0, 30, -30, 0],
                    rotate: [0, 180, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                }}
                style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'yellow',
                    borderRadius: '50%',
                    margin: '10px',
                }}
            />
        </div>
    );
};

export default MovingElements;
