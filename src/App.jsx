import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

function App() {

  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <h1>Theme Switcher</h1>

      <p>Toggle between Light and Dark mode</p>

      <ThemeToggle />
    </div>
  );
}

export default App;
