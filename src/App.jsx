import React, { useRef, useEffect, Suspense, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Sky, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import Lottie from 'lottie-react';
import mouseAnimation from './assets/mouse_animation.json';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Ocean Component
function Ocean() {
  const ref = useRef();
  const waterRef = useRef();
  const { scene } = useThree();

  const waterEffect = useMemo(() => {
    const waterGeometry = new THREE.PlaneGeometry(1000, 1000);
    const waterNormals = new THREE.TextureLoader().load(
      'https://threejs.org/examples/textures/waternormals.jpg',
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    );

    return new Water(waterGeometry, {
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals,
      sunDirection: new THREE.Vector3(-0.5, 1, -0.5),
      sunColor: 0xffa500,
      waterColor: 0x001e0f,
      distortionScale: 20.0,
      //fog: false
    });
  }, []);

  useEffect(() => {
    waterEffect.rotation.x = -Math.PI / 2;
    ref.current.add(waterEffect);
    waterRef.current = waterEffect;
  }, [scene, waterEffect]);

  useFrame((_, delta) => {
    waterRef.current.material.uniforms['time'].value += delta;
  });

  return <group ref={ref} />;
}

// Camera Controls
function CameraController({ onScroll }) {
  const { camera } = useThree();
const scrollThreshold = useRef(0);
const isAnimating = useRef(false);

useEffect(() => {
  camera.position.set(0, 5, 30);
  camera.lookAt(0, 0, -500);
  
  const handleScroll = (e) => {
    e.preventDefault();
    
    if (isAnimating.current) return;
    
    scrollThreshold.current += e.deltaY;
    
    // Lower threshold for quicker response
    if (Math.abs(scrollThreshold.current) > 50) {
      isAnimating.current = true;
      
      // Increased movement multiplier
      const direction = scrollThreshold.current > 0 ? -3 : 3;
      const targetY = Math.min(Math.max(
        camera.position.y + direction,
        -1
      ), 10);
      
      gsap.to(camera.position, {
        y: targetY,
        duration: 0.4,
        ease: "power.out", // Smoother easing
        onComplete: () => {
          isAnimating.current = false;
          scrollThreshold.current = 0;
          onScroll(targetY);
        },
        onUpdate: () => {
          onScroll(camera.position.y);
        }
      });
    }
  };
  
  window.addEventListener('wheel', handleScroll, { passive: false });
  return () => window.removeEventListener('wheel', handleScroll);
}, [camera, onScroll]);
  
  return null;
}

const ScrollIndicator = ({ visible }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '40px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '60px',
      zIndex: 10,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out',
      pointerEvents: 'none'
    }}>
      <Lottie 
        animationData={mouseAnimation}
        loop={true}
        autoplay={true}
      />
    </div>
  );
};

// Optimized Bottle Component
const Bottle = React.memo(({ position, rotation, scale }) => {
  const model = useLoader(GLTFLoader, '/plastic.gltf');
  const clonedScene = useMemo(() => model.scene.clone(), [model]);
  
  return (
    <primitive 
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
});

const fish = React.memo(({ position, rotation, scale }) => {
  const model = useLoader(GLTFLoader, '/fish/fish.gltf');
  const clonedScene = useMemo(() => model.scene.clone(), [model]);
  
  return (
    <primitive 
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
});

function FloatingObject({ children, speed = 3, phase = 0 }) {
  const ref = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.y += Math.sin(t * speed + phase) * 0.01;
    ref.current.rotation.x = Math.sin(t * speed * 0.5 + phase) * 0.01;
    ref.current.rotation.z = Math.cos(t * speed * 0.3 + phase) * 0.01;
    ref.current.rotation.y += 0.001;
  });
  
  return <group ref={ref}>{children}</group>;
}

function Scene({ onScroll }) {
  const [scrollY, setScrollY] = useState(5);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Smoothly transition opacity based on scroll position
    setOpacity(scrollY > 0 ? 1 : 0);
    onScroll(scrollY <= 0);
  }, [scrollY, onScroll]);

  const bottles = useMemo(() => 
    Array.from({ length: 75 }, (_, i) => ({
      position: [
        Math.random() * 200 - 100,
        Math.random() * -0.001,
        Math.random() * 200 - 100
      ],
      rotation: [0, Math.random() * Math.PI * 2, 0],
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.5
    })), []
  );

  const fadeStyle = {
    transition: 'opacity 0.5s ease-in-out',
    opacity: opacity
  };

  return (
    <>
      <Ocean />
      <Sky
        distance={450000}
        sunPosition={[1.5, 0.5, 1.5]}
        inclination={0.2}
        azimuth={0.75}
      />
      <ambientLight intensity={0.3} color="#ffccaa" />
      <directionalLight position={[-0.5, 1, -0.5]} intensity={1} color="#ffaa33" />
      
      <Suspense fallback={null}>
        <group style={fadeStyle}>
          {scrollY > 0 && bottles.map((props, i) => (
            <FloatingObject key={i} speed={props.speed} phase={props.phase}>
              <Bottle
                position={props.position}
                rotation={props.rotation}
                scale={[20, 20, 20]}
              />
            </FloatingObject>
          ))}
        </group>
      </Suspense>

      <Text
        position={[0, 30, -500]}
        fontSize={100}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        material-transparent={true}
        material-opacity={opacity}
      >
        Océan-Humain
      </Text>
      
      <CameraController onScroll={setScrollY} />
    </>
  );
}

const bubbleStyles = `
  @keyframes float {
    0% { 
      transform: translateY(0) scale(1); 
      opacity: 0.8; 
    }
    100% { 
      transform: translateY(-100vh) scale(1.2); 
      opacity: 0; 
    }
  }

  @keyframes explode {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(2); opacity: 0; }
  }

  .bubble {
    position: absolute;
    background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8), rgba(255,255,255,0.2));
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    bottom: -50px;
  }

  .exploding {
    animation: explode 0.5s ease-out forwards !important;
  }
`;

const Bubbles = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const createBubble = () => ({
      id: Math.random(),
      size: Math.random() * 60 + 20,
      left: Math.random() * 100,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
      isExploding: false
    });

    const checkCollision = () => {
      setBubbles(prev => prev.map(bubble => {
        const element = document.querySelector(`[data-id="${bubble.id}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 0) { // Only check top collision
            return { ...bubble, isExploding: true };
          }
        }
        return bubble;
      }));
    };

    const initialBubbles = Array.from({ length: 15 }, createBubble);
    setBubbles(initialBubbles);

    const interval = setInterval(() => {
      setBubbles(prev => [...prev.filter(b => !b.isExploding).slice(-12), createBubble()]);
    }, 1200);

    const collisionInterval = setInterval(checkCollision, 100);

    return () => {
      clearInterval(interval);
      clearInterval(collisionInterval);
    };
  }, []);

  return (
    <>
      <style>{bubbleStyles}</style>
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          data-id={bubble.id}
          className={`bubble ${bubble.isExploding ? 'exploding' : ''}`}
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            animation: bubble.isExploding ? undefined : `float ${bubble.duration}s ease-in ${bubble.delay}s`,
          }}
        />
      ))}
    </>
  );
};

export default function App() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <header style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        zIndex: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.0)', 
        color: 'white', 
        padding: '40px',
        boxSizing: 'border-box',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 400
      }}>
        <h1 style={{ margin: 0 }}>Nuit de l'info 2024</h1>
        <nav>
          <a href="#home" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>A propos</a>
          <a href="#about" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Les défis</a>
          <a href="#contact" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Crédits</a>
        </nav>
      </header>
      {!showAbout && (
        <ScrollIndicator visible={true} />
      )}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0 }}>
        <Canvas camera={{ position: [0, 25, 30], fov: 55 }}>
          <Scene onScroll={setShowAbout} />
        </Canvas>
      </div>
      {showAbout && (
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'linear-gradient(#857687, #1D1D1E)',        
          color: 'white',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 400,
          overflowY: 'auto',
          scrollBehavior: 'smooth',
          perspective: '1000px'
        }}>
          <Bubbles />
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto',
            padding: '0 20px'
          }}>
            {/* First Section */}
            <div style={{ 
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              padding: '0 20px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <h2 style={{ 
                fontSize: '3.5em',
                marginBottom: '1.5em',
                background: 'linear-gradient(45deg, #4FB8FF, #2196F3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '600',
                letterSpacing: '-1px'
              }}>Le challenge de la nuit</h2>
              
              <div style={{
                maxWidth: '700px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5em'
              }}>
                <p style={{ 
                  fontSize: '1.3em',
                  lineHeight: '1.7',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  Bienvenue sur notre application interactive "Si l'Océan était un corps humain". Cette plateforme éducative 
                  et immersive explore les fascinantes similarités entre le corps humain et l'Océan. 
                </p>
                
                <p style={{ 
                  fontSize: '1.2em',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  Notre objectif est de vous aider à comprendre l'importance vitale de l'Océan et son rôle crucial dans 
                  la préservation de la vie sur Terre.
                </p>
                
                <p style={{ 
                  fontSize: '1.2em',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  Découvrez comment chaque partie du corps humain trouve son écho dans les mécanismes océaniques : 
                  le cœur et les courants marins, les poumons et la photosynthèse, et bien plus encore.
                </p>
                
                <p style={{ 
                  fontSize: '1.2em',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  Ensemble, explorons ces parallèles pour inspirer une prise de conscience collective et encourager la 
                  protection de cet écosystème essentiel.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}