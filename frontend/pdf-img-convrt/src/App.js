import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HomePage from "./scenes/home";
import Landing from "./scenes/landing";
import PremierPage from "./scenes/premier";
import AmericanPage from "./scenes/aHomes";
import FirstKeyPage from "./scenes/firstKey";
import ConfirmationPage from "./scenes/confirmation";
function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Box display="flex" justifyContent="center" >
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/" element={<Landing />} />
              <Route path="/FRSTKTX" element={<FirstKeyPage />} />
              <Route path="/PRMTXH" element={<PremierPage />} />
              <Route path="/4H4ARTX" element={<AmericanPage />} />
              <Route path="/success" element={<ConfirmationPage />} />

              </Routes>
              </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
