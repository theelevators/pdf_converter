import { ColorModeContext, useMode, tokens } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import TestPage from "./scenes/test";
import Landing from "./scenes/landing";
import FormPage from "./components/FormPage";
import ConfirmationPage from "./scenes/confirmation";
import LoginPage from "./scenes/login";
import HomePage from "./scenes/home";
import NotFound from "./scenes/notFound";
import FAQ from "./scenes/faq";
import Sidebar from "./scenes/global/Sidebar";

import FormCreate from "./scenes/form";
import Submissions from "./scenes/Submissions/index";

function App() {

  const [theme, colorMode] = useMode();
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LoginPage />} />

              
              <Route path="/submissions">
                <Route path=":id" element={<FormPage />} />
                <Route path="success" element={<ConfirmationPage />} />
              </Route>
              <Route path="/admin" element={<Sidebar />}>
                <Route index element={<HomePage />} />
                <Route path="form" element={<FormCreate />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="submissions" element={<Submissions />} />
                <Route path="formtest" element={<TestPage />} />
              </Route>

              <Route path="/*" element={<NotFound />} />
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
