import React, { useEffect, useState } from 'react';

const TorchEffect: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Primary Torch Glow */}
      <div
        className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-500 ease-out"
        style={{
          opacity: opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(200, 161, 91, 0.08), transparent 40%)`
        }}
      />
      {/* Intense Core Glow */}
      <div
        className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-500 ease-out"
        style={{
          opacity: opacity,
          background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, rgba(200, 161, 91, 0.05), transparent 50%)`
        }}
      />
    </>
  );
};

export default TorchEffect;