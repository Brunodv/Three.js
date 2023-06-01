import React, { useState } from 'react';
import Matrix from './Matrix';
import './controls.css';

function Controls({ onRotationChange }) {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);

  const handleSliderChange = (axis, value) => {
    if (axis === 'x') {
      setRotationX(value);
    } else if (axis === 'y') {
      setRotationY(value);
    } else if (axis === 'z') {
      setRotationZ(value);
    }

    const newRotation = {
      z: axis === 'x' ? value : rotationX,
      x: axis === 'y' ? value : rotationY,
      y: axis === 'z' ? value : rotationZ,
    };

    onRotationChange(newRotation);
  };

  const createRotationMatrix = (axis) => {
    const value = axis === 'x' ? rotationX : axis === 'y' ? rotationY : rotationZ;

    let matrix;
    if (axis === 'x') {
      matrix = [
        [1.00, 0.00, 0.00],
        [0.00, Math.cos(value).toFixed(2), -Math.sin(value).toFixed(2)],
        [0.00, Math.sin(value).toFixed(2), Math.cos(value).toFixed(2)],
      ];
    } else if (axis === 'y') {
      matrix = [
        [Math.cos(value).toFixed(2), 0, Math.sin(value).toFixed(2)],
        [0.00, 1.00, 0.00],
        [-Math.sin(value).toFixed(2), 0, Math.cos(value).toFixed(2)],
      ];
    } else if (axis === 'z') {
      matrix = [
        [Math.cos(value).toFixed(2), -Math.sin(value).toFixed(2), 0],
        [Math.sin(value).toFixed(2), Math.cos(value).toFixed(2), 0],
        [0.00, 0.00, 1.00],
      ];
    }

    return matrix;
  };

  const multiplyMatrices = (matrixA, matrixB) => {
    const result = [];
    for (let i = 0; i < matrixA.length; i++) {
      const row = [];
      for (let j = 0; j < matrixB[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < matrixB.length; k++) {
          sum += matrixA[i][k] * matrixB[k][j];
        }
        row.push(sum.toFixed(2));
      }
      result.push(row);
    }
    return result;
  };

  const matrixX = createRotationMatrix('x');
  const matrixY = createRotationMatrix('y');
  const matrixZ = createRotationMatrix('z');

  const resultMatrix = multiplyMatrices(multiplyMatrices(matrixX, matrixY), matrixZ);

  return (
    <div className="controls">
      <div className="sliders">
        <h1>Controles</h1>
      <div className="labelInput">
        <label htmlFor="x-slider">Rotación Φ:</label>
        <input
          id="x-slider"
          type="range"
          min={-Math.PI * 2}
          max={Math.PI * 2}
          step={0.01}
          value={rotationX}
          onChange={(e) => handleSliderChange('x', e.target.value)}
          className="slider"
        />
      </div>
      <div className="labelInput">
        <label htmlFor="y-slider">Rotación θ:</label>
        <input
          id="y-slider"
          type="range"
          min={-Math.PI * 2}
          max={Math.PI * 2}
          step={0.01}
          value={rotationY}
          onChange={(e) => handleSliderChange('y', e.target.value)}
          className="slider"
        />
      </div>
      <div className="labelInput">
        <label htmlFor="z-slider">Rotación Ψ:</label>
        <input
          id="z-slider"
          type="range"
          min={-Math.PI * 2}
          max={Math.PI * 2}
          step={0.01}
          value={rotationZ}
          onChange={(e) => handleSliderChange('z', e.target.value)}
          className="slider"
        />
      </div>
      </div>
      <div className="matrices">
          <Matrix name="Alabeo" rows={matrixX} />
          <Matrix name="Cabeceo" rows={matrixY} />
          <Matrix name="Guiñada" rows={matrixZ} />
          <Matrix name="Resultado" rows={resultMatrix} decimalPlaces={2} />
      </div>
      <div>
      </div>
    </div>
  );
}

export default Controls;
