import { useEffect, useRef, useState } from "react";


const WIDTH = 28;
const HEIGHT = 28;
const SCALE = 10;

function ImagePredictionTensor() {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    fetch("/mnist/mlp-mnist-model.json")
      .then(response => response.json())
      .then(data => setModel(data));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.width = `${canvas.width * SCALE}px`;
    canvas.style.height = `${canvas.height * SCALE}px`;

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1.5;

    const startDrawing = (event) => {
      const { offsetX, offsetY} = event;
      const scaledX = offsetX / SCALE;
      const scaledY = offsetY / SCALE;

      ctx.beginPath();
      ctx.moveTo(scaledX, scaledY);
      isDrawingRef.current = true;
    };

    const draw = (event) => {
      if (!isDrawingRef.current) return;

      const { offsetX, offsetY} = event;
      const scaledX = offsetX / SCALE;
      const scaledY = offsetY / SCALE;

      ctx.lineTo(scaledX, scaledY);
      ctx.stroke();
    };

    const stopDrawing = () => {
      ctx.closePath();
      isDrawingRef.current = false;
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, []);

  const normalizeData = (pixel) => pixel / 255.0;

  const preprocessCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    const grayScaleData = [];

    for (let i = 0; i < imageData.data.length; i += 4) {
      grayScaleData.push(imageData.data[i]);
    }

    return grayScaleData;
  }

  const activationFunction = (sum) => {
    return Math.max(0, sum);
  }

  const softmax = (outputs) => {
    const maxOutput = Math.max(...outputs);
    const expValues = outputs.map(output => Math.exp(output - maxOutput));
    const sumExpValues = expValues.reduce((sum, val) => sum + val, 0);
    return expValues.map(val => val / sumExpValues);
  }

  const predict = () => {
    const inputs = preprocessCanvas().map(pixel => normalizeData(pixel));

    const hiddenSums = model.weightsInputHidden.map((weights, i) => {
      return weights.reduce((sum, weight, j) => sum + (weight * inputs[j]), model.biasesHidden[i]);
    });

    const hiddenActivations = hiddenSums.map(z => activationFunction(z));

    const outputSums = model.weightsHiddenOutput.map((weights, i) => {
      return weights.reduce((sum, weight, j) => sum + (weight * hiddenActivations[j]), model.biasesOutput[i]);
    });

    const outputProbabilities = softmax(outputSums);
    const prediction = outputProbabilities.indexOf(Math.max(...outputProbabilities));
    setPrediction(prediction);
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    setPrediction(null);
  }

  const saveToTrainingSet = (label) => {
    const input = preprocessCanvas();
    const misclassifiedData = {input, label};

    fetch("http://localhost:3001/save-misclassified-mlp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(misclassifiedData)
    })
    .then(data => {
      console.log("Data has been saved!");
      clearCanvas();
      alert("Saved Succesfuly!");
    })
    .catch(error => console.error("Error saving data: " + error));
  }

  return (
    <div className="page-container">
      <div className="page-header">
          Image Prediction - Tensor
      </div>
      <div className="page-content">
        <canvas
          ref={canvasRef}
          style={{border: "1px solid black"}}
        />
      </div>
      <div>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={predict}>Prediction</button>
      </div>
      { prediction !== null &&
        <div>
          Prediction: {prediction}
          <div style={{marginTop: 20}}>
              {
                Array.from({length: 10}, (_, i) => i)
                  .map(label =>
                    <button onClick={() => saveToTrainingSet(label)}>Save - LABEL {label}</button>
                  )
              }
          </div>
        </div>
      }
    </div>
  )
}

export default ImagePredictionTensor;
