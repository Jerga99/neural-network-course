
import { useEffect, useState } from "react";


function PreviewTestImages() {
  const [mnistData, setMnistData] = useState(null);

  useEffect(() => {
    fetch("/mnist/test-data-0.json")
      .then(response => response.json())
      .then(data => setMnistData(data));
  }, []);

  const createImageUrl = (inputs) => {


  }

  if (!mnistData) {
    return <div>Loading...</div>
  }

  const {inputs, labels} = mnistData;

  return (
    <>
      <div className="page-container">
        <div className="page-header">
          Mnist Test Images
        </div>
        <div className="page-content">
          <div className="images">
            {inputs.map((input, index) => (
              <div key={index} className="image-container">
                <img src={createImageUrl(input)} alt={`Digit ${labels[index]}`} />
                <p>Label: {labels[index]}, Idx: {index}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PreviewTestImages;
