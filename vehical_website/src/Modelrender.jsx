// src/ModelViewer.jsx

import React, { Suspense } from 'react';
import ev from './assets/3dmodels/ev_car/scene.gltf';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Load the GLTF model using the useGLTF hook
const Model = ({ url }) => {
  const { scene } = useGLTF(url, true);

  // Use the useFrame hook to rotate the model continuously
  useFrame(() => {
    scene.rotation.y += 0.008; // Adjust rotation speed as needed
  });

  // Set the scale of the model
  scene.scale.set(3, 3, 3); // Adjust the scale to ensure it's visible in the viewport

  return <primitive object={scene} />;
};

const ModelViewer = () => {
  return (
    <div className='w-full h-screen '>s
      <Canvas 
        camera={{ position: [0, 2, 10], fov: 60 }} 
        style={{ width: '100%', height: '100%' }}
      >
        {/* Add ambient light */}
        <ambientLight intensity={1} />

        {/* Add directional light for more focused lighting */}
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <directionalLight position={[-5, 5, 5]} intensity={0.3} />

        {/* Add hemisphere light for overall illumination */}
        <hemisphereLight intensity={3} />

        {/* Optionally add a spotlight for dramatic effects */}
        <spotLight position={[15, 20, 10]} angle={0.3} intensity={5} />

        <Suspense fallback={null}>
          <Model url={ev} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
