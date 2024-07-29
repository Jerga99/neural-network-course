import { useEffect, useState } from "react";


function ImagePrediction() {
  const [binaryModel, setBinaryModel] = useState(null);

  useEffect(() => {
    fetch("/mnist/binary-model.json")
      .then(response => response.json())
      .then(data => setBinaryModel(data));
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
          Image Prediction - Binary Perceptron
      </div>
      <div className="page-content">
        <canvas
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
