import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import TestPage from "./scenes/test";
import Landing from "./scenes/landing";
import FormPage from "./components/FormPage";
import ConfirmationPage from "./scenes/confirmation";
import LoginPage from "./scenes/login";
import HomePage from "./scenes/home";
import NotFound from "./scenes/notFound";
import FAQ from "./scenes/faq";
import Sidebar from "./scenes/global/Sidebar";
import { useState, useEffect } from "react";
import FormCreate from "./scenes/form";
import Submissions from "./scenes/Submissions/index";
import SignUpPage from "./signup";
import GeneralModal from "./components/Modal";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

function App() {
  const [theme, colorMode] = useMode();

  const [userToken, setUserToken] = useState("");
  const [formToken, setformToken] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const navigate = useNavigate();

  const handleUserToken = (token) => {
    setUserToken(token);
  };

  const [showModal, setShowModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [leftButtonTitle, setLeftButtonTitle] = useState("");
  const [rightButtonTitle, setRightButtonTitle] = useState("");
  const [isLeftSelected, setIsLeftSelected] = useState(false);
  const [isRightSelected, setIsRightSelected] = useState(false);
  const [modalEntry, setModalEntry] = useState("");

  const handleEditable = (prompt) => {
    setIsEditable(true);
    setModalTitle(prompt);
    setLeftButtonTitle("Ok");
    setRightButtonTitle("Cancel");
    setShowModal(true);
  };
  const handleModalResponse = (subtitle) => {
    if (subtitle === "Ok") {
      setIsLeftSelected(true);
      setShowModal(false);
    }
  };

  const handleModalEntry = (entry) => {
    if (entry.target.value !== "") {
      setModalEntry(entry.target.value);
      return;
    }
    setIsEditable(false);
    setModalTitle("The Entry Cannot Be Empty");
    setLeftButtonTitle("Ok");

    setRightButtonTitle("Cancel");
    setShowModal(true);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Routes>
              <Route path="/forms" element={<Landing />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/" element={<HomePage />} />

              <Route path="/forms">
                <Route
                  path=":id"
                  element={<FormPage userToken={userToken} />}
                />
                <Route path="success" element={<ConfirmationPage />} />
              </Route>

              <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                  <Route path="/:id" element={<Sidebar />}>
                    <Route
                      index
                      element={<FormCreate />}
                    />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="submissions" element={<Submissions />} />
                    <Route path="formtest" element={<TestPage />} />
                  </Route>
                </Route>
              </Route>

              <Route path="/*" element={<NotFound />} />
            </Routes>

            <GeneralModal
              title={modalTitle}
              leftButtonTitle={leftButtonTitle}
              rightButtonTitle={rightButtonTitle}
              isEditable={isEditable}
              showModal={showModal}
              handleModalEntry={handleModalEntry}
              setShowModal={setShowModal}
              setModalStatus={handleModalResponse}
            />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
