import { useState } from "react";
import Home from "./pages/Home";
import PreviewTestImages from "./pages/mnist/PreviewTestImages";

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

function Router() {
  const [pathname, setPathname] = useState(window.location.pathname);

  switch(pathname) {
    case "/mnist/test-images":
       return <PreviewTestImages />;
    default:
      return <Home />;
  }

}

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <Navigation />
        <Router />
      </div>
    </div>
  );
}

export default App;
