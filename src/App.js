import "./App.css";
import { useEffect } from "react";
import { setInitialData } from "./utils/setInitialData";
import Routes from "./routes";

const App = () => {
  useEffect(() => {
    setInitialData();
  }, []);
  return (
    <div className="app">
      <Routes />
    </div>
  );
};

export default App;
