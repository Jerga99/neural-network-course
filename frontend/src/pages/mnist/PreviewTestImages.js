
import { useEffect, useState } from "react";


function PreviewTestImages() {
  const [mnistData, setMnistData] = useState(null);

  useEffect(() => {
    fetch("/mnist/test-data.json")
      .then(response => response.json())
      .then(data => setMnistData(data));
  }, []);

  if (!mnistData) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="page-container">
        <div className="page-header">
          Mnist Test Images
        </div>
        <div className="page-content">
          <div className="image">
            {JSON.stringify(mnistData.inputs)}
          </div>
        </div>
      </div>
    </>
  )
}

export default PreviewTestImages;
