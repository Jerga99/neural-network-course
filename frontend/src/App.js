import Home from "./pages/Home";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <div className="link" onClick={() => alert("Go Home!")}>
            Home
          </div>
        </li>
        <li>
          <div className="link" onClick={() => alert("Preview test images")}>
            Preview test images
          </div>
        </li>
        <li>
          <div className="link" onClick={() => alert("Test Perceptron")}>
            Test Perceptron
          </div>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <Navigation />
        <Home />
      </div>
    </div>
  );
}

export default App;
