import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      
      greenAccent: {
        100: "#e4e4fb",
        200: "#c8c9f8",
        300: "#adaef4",
        400: "#9193f1",
        500: "#7678ed",
        600: "#5e60be",
        700: "#47488e",
        800: "#2f305f",
        900: "#18182f"
},
      primary: {
        100: "#d8d6e8",
        200: "#b1aed1",
        300: "#8b85b9",
        400: "#645da2",
        500: "#3d348b",
        600: "#312a6f",
        700: "#251f53",
        800: "#181538",
        900: "#0c0a1c"

},
grey: {
  100: "#fdf1cc",
  200: "#fce399",
  300: "#fad467",
  400: "#f9c634",
  500: "#f7b801",
  600: "#c69301",
  700: "#946e01",
  800: "#634a00",
  900: "#312500"
},
redAccent: {
  100: "#fce7cc",
  200: "#f9cf99",
  300: "#f7b767",
  400: "#f49f34",
  500: "#f18701",
  600: "#c16c01",
  700: "#915101",
  800: "#603600",
  900: "#301b00"
},
blueAccent: {
  100: "#fddecd",
  200: "#fabd9b",
  300: "#f89d68",
  400: "#f57c36",
  500: "#f35b04",
  600: "#c24903",
  700: "#923702",
  800: "#612402",
  900: "#311201"
},
      }
    : {
      grey: {
        100: "#080e11",
        200: "#0f1c21",
        300: "#172a32",
        400: "#1e3842",
        500: "#264653",
        600: "#516b75",
        700: "#7d9098",
        800: "#a8b5ba",
        900: "#d4dadd"
    },
    primary: {
        100: "#081f1d",
        200: "#113f39",
        300: "#195e56",
        400: "#227e72",
        500: "#2a9d8f",
        600: "#55b1a5",
        700: "#7fc4bc",
        800: "#aad8d2",
        900: "#d4ebe9",
    },
    greenAccent: {
        100: "#2f2715",
        200: "#5d4e2a",
        300: "#8c7640",
        400: "#ba9d55",
        500: "#e9c46a",
        600: "#edd088",
        700: "#f2dca6",
        800: "#f6e7c3",
        900: "#fbf3e1",
    },
    redAccent: {
        100: "#312013",
        200: "#624127",
        300: "#92613a",
        400: "#c3824e",
        500: "#f4a261",
        600: "#f6b581",
        700: "#f8c7a0",
        800: "#fbdac0",
        900: "#fdecdf",
    },
    blueAccent: {
        100: "#2e1610",
        200: "#5c2c20",
        300: "#8b4331",
        400: "#b95941",
        500: "#e76f51",
        600: "#ec8c74",
        700: "#f1a997",
        800: "#f5c5b9",
        900: "#fae2dc",
    },
      }),
});

//mui theme settings

export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [],
  );
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
