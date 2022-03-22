import { createContext } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useLocalStorage("mode", "dark");
  const [color, setColor] = useLocalStorage(
    "color",
    "linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)"
  );

  const changeColor = (backgroundImage) => {
    setColor(backgroundImage);
  };
  const changeMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, color, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}