import { useEffect, useState } from "react";
import Home from "./pages/Home";
import PreviewTestImages from "./pages/mnist/PreviewTestImages";

function Navigation() {

  const pushState = (path) => (e) => {
    e.preventDefault();
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  return (
    <nav>
      <ul>
        <li>
          <div className="link" onClick={pushState("/")}>
            Home
          </div>
        </li>
        <li>
          <div className="link" onClick={pushState("/mnist/test-images")}>
            Preview test images
          </div>
        </li>
        <li>
          <div className="link" onClick={pushState("/mnist/test-perceptron")}>
            Test Perceptron
          </div>
        </li>
      </ul>
    </nav>
  );
}

function Router() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

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
