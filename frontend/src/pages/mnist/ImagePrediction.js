import { useEffect, useRef, useState } from "react";


const WIDTH = 28;
const HEIGHT = 28;
const SCALE = 10;

function ImagePrediction() {
  const [binaryModel, setBinaryModel] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    fetch("/mnist/binary-model.json")
      .then(response => response.json())
      .then(data => setBinaryModel(data));
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
    ctx.lineWidth = 2;

    const startDrawing = () => {
      console.log("start drawing!");
    };

    const draw = () => {
      console.log("draw!");
    };

    const stopDrawing = () => {
      console.log("stop drawing!");
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

  return (
    <div className="page-container">
      <div className="page-header">
          Image Prediction - Binary Perceptron
      </div>
      <div className="page-content">
        <canvas
          ref={canvasRef}
          style={{border: "1px solid black"}}
        />
      </div>
      <div>
        <button>Clear</button>
        <button>Prediction</button>
      </div>
      <div>
        Prediction: IS ZERO
      </div>
    </div>
  )
}

export default ImagePrediction;
