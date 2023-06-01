import React from 'react';
import Matrix from './Matrix';

function MatrixResult({ matrixX, matrixY, matrixZ }) {
  const multiplyMatrices = (matrixA, matrixB) => {
    const result = [];
    for (let i = 0; i < matrixA.length; i++) {
      const row = [];
      for (let j = 0; j < matrixB[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < matrixB.length; k++) {
          sum += matrixA[i][k] * matrixB[k][j];
        }
        row.push(sum);
      }
      result.push(row);
    }
    return result;
  };

  const resultMatrix = multiplyMatrices(multiplyMatrices(matrixX, matrixY), matrixZ);

  return (
    <div>
      <h2>Resultado de la multiplicación de matrices:</h2>
      <Matrix rows={resultMatrix} />
    </div>
  );
}

export default MatrixResult;
