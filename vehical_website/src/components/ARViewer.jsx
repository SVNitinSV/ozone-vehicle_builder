import React from 'react';
import 'aframe';
import 'aframe-ar';

import ar_car from './assets/ar_car.glb';

const ARViewer = () => {
  return (
    <div>
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
        style={{ width: '100%', height: '100%' }}
      >
        <a-marker preset="hiro">
          <a-entity
            gltf-model="#carModel"
            scale="0.5 0.5 0.5"
            position="0 0 0"
          ></a-entity>
        </a-marker>
        <a-entity camera></a-entity>
        
        <a-assets>
          <a-asset-item id="carModel" src={ar_car}></a-asset-item>
        </a-assets>
      </a-scene>
    </div>
  );
}

export default ARViewer;
