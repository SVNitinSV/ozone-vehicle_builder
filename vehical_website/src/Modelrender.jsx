import chassis from './assets/3dmodels/chassis/frame.gltf'; // First model
import body from './assets/3dmodels/chassis/battery.gltf'; // Second model
import wheels from './assets/3dmodels/chassis/drivetrain.gltf'; // Third model

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Model component for each GLTF model
const Model = ({ gltfFile, visible }) => {
  const gltf = useLoader(GLTFLoader, gltfFile);
  return visible ? <primitive object={gltf.scene} /> : null;
};

const App = () => {
  const [showChassis, setShowChassis] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const [showWheels, setShowWheels] = useState(false);

  return (
    <div className='w-full h-dvh'>
      {/* Buttons to toggle the models */}
      <div className="flex space-x-4 p-4">
        <button
          onClick={() => setShowChassis(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Chassis
        </button>
        <button
          onClick={() => setShowBody(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Body
        </button>
        <button
          onClick={() => setShowWheels(true)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Add Wheels
        </button>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [-1, -1, 3], fov: 60 }}>
        {/* Lighting Setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.5}  />
        <directionalLight position={[5, -5, 5]} intensity={0.5} castShadow />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} castShadow />
        <directionalLight position={[5, 5, -5]} intensity={0.5} castShadow />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} castShadow />
        <directionalLight position={[-5, -5, 5]} intensity={0.5} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.7} />

        {/* Render Models based on state */}
        <Model gltfFile={chassis} visible={showChassis} />
        <Model gltfFile={body} visible={showBody} />
        <Model gltfFile={wheels} visible={showWheels} />

        {/* OrbitControls for interaction */}
        <OrbitControls
          enableZoom={false}
          target={[0, 0, 0]}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          enablePan={true}
        />
      </Canvas>
    </div>
  );
};

export default App;
