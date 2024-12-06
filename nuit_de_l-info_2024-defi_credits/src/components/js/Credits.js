import React, {useEffect} from 'react';
import Game from '../../models/js/SpaceInvider';
import '../css/Credits.css';

const Credits = () => {

    useEffect(() => {
        const canvas = document.getElementById('canvas');
        // Start the game
        new Game(canvas);
    });
    return (
    <div className={"Credits"}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 0 0" width="0" height="0" style={{display: 'none'}}>
            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"/>
                </filter>
            </defs>
        </svg>
        <div className={"Container"}>
            <div className="goo">
                <h1>Credits pages</h1>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
            </div>
            <div className={"Game"}>
                <div className={"GameRule"}>
                    <h3>Plastic Invider</h3>
                    <p>Use arrow keys to move 'left' or 'right' and 'space' to start shooting to reveal credits :</p>
                    <br/>
                    <div id={"Names"}>
                        <p className={"Name"} id={"name1"}>Santhakumaran Akira</p>
                        <p className={"Name"} id={"name2"}>Laporte Logan</p>
                        <p className={"Name"} id={"name3"}>Doglioli-Ruppert Germain</p>
                        <p className={"Name"} id={"name4"}>Bitoun Nathan</p>
                        <p className={"Name"} id={"name5"}>Boretti Alexander</p>
                        <p className={"Name"} id={"name6"}>Torri Clara</p>
                        <p className={"Name"} id={"name7"}>Moncada Jeremy</p>
                        <p className={"Name"} id={"name8"}>Toupin Nicolas</p>
                        <p className={"Name"} id={"name9"}>Baras Alexis</p>
                        <p className={"Name"} id={"name10"}>Baras Martin</p>
                        <p className={"Name"} id={"name11"}>Da Vinha Mathieu</p>
                        <p className={"Name"} id={"name12"}>Lainel Jim</p>
                        <p className={"Name"} id={"name13"}>Carpentier Valentin</p>
                        <p className={"Name"} id={"name14"}>Domingues Matthis</p>
                        <p className={"Name"} id={"name15"}>Berthod Loris</p>
                        <p className={"Name"} id={"name16"}>Chellali Adam</p>
                        <p className={"Name"} id={"name17"}>Rainero Louis</p>
                        <p className={"Name"} id={"name18"}>Outili Rayan</p>
                        <p className={"Name"} id={"name19"}>Panossian Luca</p>
                        <p className={"Name"} id={"name20"}>Portelette Thomas</p>
                        <p className={"Name"} id={"name21"}>Griffonnet Matthieu</p>
                        <p className={"Name"} id={"name22"}>Gorbatch Clément</p>
                    </div>
                </div>

                <canvas id="canvas" width="800" height="800"></canvas>
            </div>

        </div>

    </div>

    );
};

export default Credits;