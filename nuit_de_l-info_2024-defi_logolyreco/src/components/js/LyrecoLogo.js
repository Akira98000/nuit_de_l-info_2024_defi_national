import React, { useEffect, useRef, useState } from "react";
import lyreco from "../../resources/lyreco.png";

const LyercoLogo = () => {
    const isAsciiOrNot = Math.random() > 0.5 ? 0 : 1;
    const x = Math.floor(Math.random() * 1270); // Position horizontale entre 0 et 1920
    const y = Math.floor(Math.random() * 720); // Position verticale entre 0 et 1080
    const w = Math.floor(50 + Math.random() * 210); // Largeur aléatoire entre 50 et 260
    const h = Math.floor(30 + Math.random() * 130); // Hauteur aléatoire entre 30 et 160
    const pos = { x, y };
    const style = {
        position: "absolute",
        left: `${Math.min(pos.x, 1920 - w)}px`, // Empêche de sortir horizontalement de la page
        top: `${Math.min(pos.y, 1080 - h)}px`, // Empêche de sortir verticalement de la page
        width: `${w}px`,
        height: `${h}px`,
        opacity: Math.random(),
    };

    const canvasRef = useRef(null);
    const [asciiArt, setAsciiArt] = useState("");

    const transformIntoAscii = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = lyreco;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, w, h);

            const imageData = ctx.getImageData(0, 0, w, h);
            const pixels = imageData.data;

            const asciiChars = "@#S%?*+;:,.";
            let ascii = "";

            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const index = (y * w + x) * 4;
                    const r = pixels[index];
                    const g = pixels[index + 1];
                    const b = pixels[index + 2];

                    const brightness = (r + g + b) / 3;
                    const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
                    ascii += asciiChars[charIndex];
                }

                ascii += "\n";
            }
            setAsciiArt(ascii);
            console.log(ascii); // Télécharge l'art ASCII
        };
    };

  

    useEffect(() => {
        if (isAsciiOrNot) {
            transformIntoAscii();
        }
    }, []);

    if (!isAsciiOrNot) {
        return <img src={lyreco} alt="Logo" width={w} height={h} style={style} />;
    } else {
        return (
            <div style={{ ...style, fontFamily: "monospace", whiteSpace: "pre" }}>
                <canvas ref={canvasRef} width={w} height={h} style={{ display: "none" }} />
            </div>
        );
    }
};

export default LyercoLogo;
