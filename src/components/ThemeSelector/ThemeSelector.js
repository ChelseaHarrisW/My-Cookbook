import { useTheme } from "../Hooks/UseTheme";
import bright from "../Photos/bright.svg";

import "./ThemeSelector.css";

const themeColors = [
  "linear-gradient( 135deg, #F761A1 10%, #8C1BAB 100%)",
  "linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)",
  "linear-gradient( 135deg, #65FDF0 10%, #1D6FA3 100%)",
];

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();

  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          onClick={toggleMode}
          src={bright}
          alt="brightness switch"
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}