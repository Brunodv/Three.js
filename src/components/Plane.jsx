import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { OBJLoader } from 'three/examples/jsm/loaders/ObjLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import './plane.css'; // Importa el archivo plane.css

function Plane({ rotation }) {
  const objPath = '/Three/piper_pa18.obj'; // Ruta al archivo .obj
    const mtlPath = '/Three/piper_pa18.mtl'; // Ruta al archivo .mtl
  const groupRef = useRef();

  useEffect(() => {
    const loader = new MTLLoader();
    loader.load(mtlPath, (materials) => {
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(objPath, (object) => {
        groupRef.current.add(object);
      });
    });
  }, [objPath, mtlPath]);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
    }
  }, [rotation]);

  return (
    <div className="plane-container">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.3} />
        <group ref={groupRef} />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={0.2} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default Plane;
