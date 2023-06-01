
import React, { useState } from 'react';
import Plane from './components/Plane.jsx';
import Controls from './components/Controls';
import './App.css'

function App() {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const handleRotationChange = (newRotation) => {
    setRotation(newRotation);
  };
  return (
    <div className="App">
      <div className='container1'>
        <h1 className='title'>Calculadora automática - ANGULOS DE EULER</h1>
        <Plane rotation={rotation}/>
      </div>
        <Controls
        xRotation={rotation.x}
        yRotation={rotation.y}
        zRotation={rotation.z}
        onRotationChange={handleRotationChange}
        />
    </div>
  )
}

export default App
