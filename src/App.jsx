import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BaseApp from "./components/BaseApp";
import { useEffect } from "react";
import { useThemeContext } from "./store/ThemeContext";

function App() {
  const { applyTheme } = useThemeContext();
  useEffect(() => {
    window.onload = () => {
      applyTheme();
    };
  }, []);

  return (
    <>
      <BaseApp />
    </>
  );
}

export default App;
