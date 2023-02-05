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
          900: "#18182f",
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
          900: "#0c0a1c",
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
          900: "#312500",
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
          900: "#301b00",
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
          900: "#311201",
        },
      }
    : {
        blueAccent: {
          900: "#efd2d0",
          800: "#dfa6a0",
          700: "#ce7971",
          600: "#be4d41",
          500: "#ae2012",
          400: "#8b1a0e",
          300: "#68130b",
          200: "#460d07",
          100: "#230604",
        },
        primary: {
          900: "#ededf8",
          800: "#dbdbf1",
          700: "#cacaeb",
          600: "#b8b8e4",
          500: "#a6a6dd",
          400: "#8585b1",
          300: "#646485",
          200: "#424258",
          100: "#21212c",
        },
        grey: {
          900: "#fff4d8",
          800: "#ffeab0",
          700: "#ffdf89",
          600: "#ffd561",
          500: "#ffca3a",
          400: "#cca22e",
          300: "#997923",
          200: "#665117",
          100: "#33280c"
        },
      redAccent: {
          
        900: "#d3e1ff",
        800: "#a6c3ff",
        700: "#7aa5ff",
        600: "#4d87ff",
        500: "#2169ff",
        400: "#1a54cc",
        300: "#143f99",
        200: "#0d2a66",
        100: "#071533",

        },
        greenAccent: {
          900: "#e8f4d4",
          800: "#d0e9a8",
          700: "#b9df7d",
          600: "#a1d451",
          500: "#8ac926",
          400: "#6ea11e",
          300: "#537917",
          200: "#37500f",
          100: "#1c2808"
        },
        
      }
    ),
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
              main: colors.blueAccent[500],
            },
            neutral: {
              dark: colors.grey[200],
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
