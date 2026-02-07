// src/pages/works.jsx
import React from 'react';
import LorenzAttractor from '../components/hero/math2';

export default function Works() {
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-start pl-05">
      <LorenzAttractor 
        size={1200}              // BIGGER canvas
        speed={0.002}
        rotationSpeed={0.03}
        lineColor="rgba(0,0,0,0.9)"
        lineWidth={1.8}
        maxPoints={6000}
        scale={25}              // SMALLER scale so it fits inside
      />
    </div>
  );
}