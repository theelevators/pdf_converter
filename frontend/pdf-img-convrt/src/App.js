import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import TestPage from "./scenes/test";
import Landing from "./scenes/landing";
import PremierPage from "./scenes/premier";
import AmericanPage from "./scenes/aHomes";
import FirstKeyPage from "./scenes/firstKey";
import ConfirmationPage from "./scenes/confirmation";
import LoginPage from "./scenes/login";
import HomePage from "./scenes/home";
import Submissions from "./scenes/Submissions";
import FAQ from "./scenes/faq";


function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/test" element={<TestPage />} />
              <Route path="/" element={<Landing />} />
              <Route path="/FRSTKTX" element={<FirstKeyPage />} />
              <Route path="/PRMTXH" element={<PremierPage />} />
              <Route path="/4H4ARTX" element={<AmericanPage />} />
              <Route path="/success" element={<ConfirmationPage />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/login" element={<LoginPage />} />
                <Route path="/submissions" element={<Submissions />} />

              
              </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
