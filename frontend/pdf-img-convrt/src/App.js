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
import axios from "axios";
import GeneralModal from "./components/Modal";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {

  const [theme, colorMode] = useMode();

  const [userToken, setUserToken] = useState("")
  const [formToken, setformToken] = useState("")
  const [isTokenValid, setIsTokenValid] = useState(false)
  const navigate = useNavigate();


  const handleUserToken = (token) => {
    setUserToken(token)
  }

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const [showModal, setShowModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [leftButtonTitle, setLeftButtonTitle] = useState('');
  const [rightButtonTitle, setRightButtonTitle] = useState('');
  const [isLeftSelected, setIsLeftSelected] = useState(false)
  const [isRightSelected, setIsRightSelected] = useState(false)
  const [modalEntry, setModalEntry] = useState('');


  const handleEditable = (prompt) => {
    setIsEditable(true)
    setModalTitle(prompt)
    setLeftButtonTitle('Ok')
    setRightButtonTitle('Cancel')
    setShowModal(true)


  }
  const handleModalResponse = (subtitle) => {

    if (subtitle === 'Ok') {
      setIsLeftSelected(true)
      setShowModal(false)
    }

  }

  useEffect(() => (
    userToken ? navigate(`/users/${userName}`) :
    navigate(`/login`)
  ), [userToken])






  const handleUserName = (user) => {
    
    setUserName(user.target.value)
  }
  const handlePassword = (password) => {
    
    setPassword(password.target.value)
  }



  const handleModalEntry = (entry) => {
    if (entry.target.value !== "") {
      setModalEntry(entry.target.value)
      return
      }
      setIsEditable(false)
      setModalTitle('The Entry Cannot Be Empty')
      setLeftButtonTitle('Ok')

      setRightButtonTitle('Cancel')
      setShowModal(true)
  }


  const handleLogin = async () => {

    if (userName === "") {
      setModalTitle("Enter a valid username")
      setLeftButtonTitle("Ok")
      setRightButtonTitle("Dismiss")
      setShowModal(true)
      return
    }

    if (password === "") {
      setModalTitle("Enter a valid password")
      setLeftButtonTitle("Ok")
      setRightButtonTitle("Dismiss")
      setShowModal(true)
      return
    }

    const query = "user/login"

    const form = {
      "username": userName,
      "password": password
    }

    try {
      const response = await axios.post(
        `${BASE_URL}${query}`,
        form,
      ); 

      const data = response.data
      if (data.error) {
        setModalTitle(data.error)
        setLeftButtonTitle("Ok")
        setRightButtonTitle("Dismiss")
        setShowModal(true)
        return
      }
      
      if (data.token) {
        handleUserToken(data.token)
        setIsTokenValid(true)

        return
      }
    } catch (error) {
      setModalTitle(error)
      setLeftButtonTitle("Ok")
      setRightButtonTitle("Dismiss")
      setShowModal(true)
      return
      
    }

  }



  
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LoginPage handleUserName={handleUserName} handlePassword={handlePassword} handleLogin={handleLogin} />} />
              

              
              <Route path="/submissions">
                <Route path=":id" element={<FormPage userToken={userToken} />} />
                <Route path="success" element={<ConfirmationPage />} />
              </Route>
              <Route path="/users/:id" element={<Sidebar />}>
                <Route index element={<HomePage />} />
                <Route path="form" element={<FormCreate userToken={userToken}/>} />
                <Route path="faq" element={<FAQ />} />
                <Route path="submissions" element={<Submissions />} />
                <Route path="formtest" element={<TestPage />} />
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
          setModalStatus={ handleModalResponse} />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
