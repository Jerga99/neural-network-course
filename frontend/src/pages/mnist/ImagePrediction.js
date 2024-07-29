import { useEffect, useRef, useState } from "react";


const WIDTH = 28;
const HEIGHT = 28;
const SCALE = 10;

function ImagePrediction() {
  const [binaryModel, setBinaryModel] = useState(null);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

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

  const predict = () => {
    const inputs = preprocessCanvas();
  }

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
        <button onClick={predict}>Prediction</button>
      </div>
      <div>
        Prediction: IS ZERO
      </div>
    </div>
  )
}

export default ImagePrediction;
