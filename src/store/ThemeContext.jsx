import { createContext, useContext, useReducer } from "react";
import themeDataList from "../config/ThemeConfig";

export const ThemeContext = createContext({
  themeData: [],
  setTheme: () => {},
  applyTheme: () => {},
});

const themeReducer = (themeState, action) => {
  if (action.type === "SET_THEME") {
    let themeObj = {
      theme: action.payload.themeItem,
      isSetTheme: true,
    };
    localStorage.setItem("setBgTheme", JSON.stringify(themeObj));
  }
  return themeState;
};

export const ThemeProvider = ({ children }) => {
  const [themeData, dispatchThemeData] = useReducer(
    themeReducer,
    themeDataList
  );

  const setTheme = (themeItem) => {
    dispatchThemeData({
      type: "SET_THEME",
      payload: {
        themeItem,
      },
    });
  };

  //set theme from bg to body
  const applyTheme = () => {
    const { theme, isSetTheme } =
      JSON.parse?.(localStorage.getItem("setBgTheme")) || {};

    if (isSetTheme) {
      const body = document.querySelector("body");
      Object.assign(body.style, {
        backgroundImage: `url(${theme})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      });
    }
  };

  return (
    <ThemeContext.Provider
      value={{ themeData, setTheme, applyTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
