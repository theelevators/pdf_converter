import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SaveIcon from "@mui/icons-material/Save";
import { useState, useEffect } from "react";
import IosShareIcon from "@mui/icons-material/IosShare";
import IconButton from "@mui/material/IconButton";
import RequirementBox from "../../components/ReqBox";
import StandardBox from "../../components/standardBox";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// import axios from "axios";

import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import NewComponentBox from "./../../components/AddComponentBox";
import useWindowDimensions from "./../../util/utilities";
import GeneralModal from "../../components/Modal";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from '../../../src/api/axios'

const BASE_URL = process.env.REACT_APP_BASE_URL;

const FormCreate = () => {
  /* General State */
  const [formName, setFormName] = useState("");
  const [components, setComponents] = useState({});
  const [authCode, setAuthCode] = useState("");
  const { height, width } = useWindowDimensions();
  const { id } = useParams();
  const navigate = useNavigate()
  const user = id;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { auth } = useAuth();
  


  useEffect(() => {
    
    const verifyUser = async () => {
      try {
        const response = await axios.get('users');
        
        const users = response.data.users
        const userList = [...users]
        
        if (!userList.includes(user)) {
          navigate('/login')
        }

        if (id != auth.userName) {
          navigate(`/${auth.userName}`,  { replace: true })
        }

      }catch (err) {
        console.error(err)

    }
    }

    

    verifyUser()

  },[])





  /*General modal state */
  const [isEditable, setIsEditable] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [leftButtonTitle, setLeftButtonTitle] = useState("");
  const [rightButtonTitle, setRightButtonTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalEntry, setModalEntry] = useState("");
  const [modalTemp, setModalTemp] = useState("");
  




/* New Entry State */
  const [showNewModal, setShowNewModal] = useState(false);
  
/* New Component Entry State */
const [showNewComponentModal, setShowNewComponentModal] = useState(false);

  /* Share Entry State */
const [showShareModal, setShowShareModal] = useState(false);

  /* Save modal state */
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  /* Open modal state */
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);








/* General state handling */

  const handleError = (message) => {
    setShowLoadModal(false);
    setShowShareModal(false);
    setShowLoadModal(false);
    setIsEditable(false);
    setModalTitle(message);
    setLeftButtonTitle("Ok");
    setRightButtonTitle("Dismiss");
    setShowModal(true);
  };


  /* New modal Config */


  const newForm = () => {
    
    
    if (isLoaded) {
      
    
    if (isLoaded && !isSaved){
      setIsEditable(false);
      setModalTitle("You must save your work before creating new form");
      setLeftButtonTitle("Ok");
      setRightButtonTitle("Cancel");
      setShowModal(true);
      return
    }}

    setIsEditable(false);
    setModalTitle("You are about to start a new form.");
    setLeftButtonTitle("Continue");
    setRightButtonTitle("Cancel");
    setShowNewModal(true);
    return
  };


  const triggerNew = () => {
    setAuthCode('')
    setComponents({})
    setFormName('')
    setIsEditable(false)
    setIsLoaded(false)
    setIsSaved(false)
    setModalEntry('')
    setModalTitle('')
    setRightButtonTitle('')
    setShowNewModal(false)
  }


  const handleOpenModal = () => {
    triggerNew();
  };


  /* General modal Config */
  const handleSaveSucess = (message) => {
    setShowSaveModal(false);
    setIsEditable(false);
    setModalTitle(message);
    setLeftButtonTitle("Ok");
    setRightButtonTitle("Dismiss");
    setShowModal(true);
    handleIsSaved()
  };

  const handleGeneralModal = () => {
    setShowModal(false);
  };

  const handleModalEntry = (entry) => {
    if (entry.target.value !== "") {
      setModalEntry(entry.target.value);
    }
    return;
  };

  /* Save modal Config */
  const closeSaveModal = () => {
    setShowSaveModal(false);
  };

  const saveForm = () => {
    if (isLoaded) {
      triggerSave(true, formName)
      return
    }
    setIsEditable(true);
    setModalTitle("Enter form name");
    setLeftButtonTitle("Save");
    setRightButtonTitle("Cancel");
    setShowSaveModal(true);
  };
  const handleIsSaved = () => {
    setIsSaved(true);
    setIsLoaded(true);
    setFormName(modalEntry)
    
  };

  const triggerSave = (loaded, form) => {
    const componentsToLoad = JSON.stringify(components);
    let loadedForm = ''
    if (loaded) {
      loadedForm = form
    }
    if (!loaded) {
      loadedForm = modalEntry
    }
    
    
    if (isSaved) {
      closeSaveModal();
      if (modalEntry === "") {
        setModalTitle("Enter form name");
        setLeftButtonTitle("Save");
        setRightButtonTitle("Cancel");
        setShowSaveModal(true);
        return
      }
    }
    let formData = {
      username: user,
      formname: modalEntry,
      authCode: authCode,
      components: componentsToLoad,
      token: ''
    };

    if (!isLoaded) {
      axios
        .post(`saveform/?name=${loadedForm}`, formData, {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        })
        
        .then(() => handleSaveSucess("Form succesfully saved."))
        .catch((err) => handleError("Unable to save form."));
    }

    if (isLoaded) {
      axios
        .post(`${BASE_URL}updateform/?name=${loadedForm}`, formData, {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        })
        
        .then(() => handleSaveSucess("Form succesfully saved."))
        .catch((err) => handleError("Unable to save form."));
    }
  };
  const handleSaveModal = () => {
    triggerSave(false, '');
  };

  const handleComponentDelete = (e) => {
    const target = e.currentTarget.id;
    const currentComponents = { ...components };
    delete currentComponents[target];

    setComponents(currentComponents);
  };

  /* Open modal Config */


  const handleSuccessLoad = (response) => {
    
    const formComponents = JSON.parse(response.data);

    setComponents(formComponents);
    setIsLoaded(true)
    setIsSaved(false);
    setShowLoadModal(false);

    setFormName(modalEntry)
  }

  const openForm = () => {
    setIsEditable(true);
    setModalTitle("Enter form name");
    setLeftButtonTitle("Open");
    setRightButtonTitle("Cancel");
    setShowLoadModal(true);
  };

  const triggerOpen =  () => {
    
    const loadedForm = modalEntry
    
        
    
      axios.get(
        `${BASE_URL}loadform/?name=${loadedForm}`, {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      ).then( res => handleSuccessLoad(res)).catch(err => handleError("Unable To Load Form."));

 
  };
  const handleLoadModal = () => {
    triggerOpen();
  };


  /*Handle Share Button */

  const handleSuccessShare = (authCode, res) => {
    if (res.data.error) {
      setShowShareModal(false);
      setIsEditable(false);
      setModalTitle(`Unable to validate code`);
      setLeftButtonTitle("Ok");
      setRightButtonTitle("Dismiss");
      setShowModal(true);
      return
    }

    setShowShareModal(false);
    setIsEditable(false);
    setModalTitle(`Your code: ${authCode} has been validated. It will expire in 24hrs`);
    setLeftButtonTitle("Ok");
    setRightButtonTitle("Dismiss");
    setShowModal(true);
    setAuthCode("")
    setModalEntry("")

}


  const handleSucessValidation = (authCode, res) => {
    
    if (res.data.error) {
      setShowShareModal(false);
      setIsEditable(false);
      setModalTitle(`Unable to validate code`);
      setLeftButtonTitle("Ok");
      setRightButtonTitle("Dismiss");
      setShowModal(true);
      return
    }
    const token = res.data.token

    const componentsToLoad = JSON.stringify(components);
    let formData = {
      username: user,
      formname: formName,
      code: authCode,
      components: componentsToLoad,
      token: token
    };
  
      axios.post(
        `${BASE_URL}updatecode`, formData, {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }).then(res => handleSuccessShare(authCode, res)).catch(err => handleError("Unable To Create Share Code."));



  }


  const handleSuccesCreate = (authCode, res) => {
    
    if (res.data.error) {
      setShowShareModal(false);
      setIsEditable(false);
      setModalTitle(`Unable to validate code`);
      setLeftButtonTitle("Ok");
      setRightButtonTitle("Dismiss");
      setShowModal(true);
      return
    }
    const formData = {

      authCode: authCode,
    };
      axios.post(
      `${BASE_URL}updatecode`, formData,{
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      }).then( res => handleSucessValidation(authCode, res)).catch(err => handleError("Unable To Create Share Code."));
   

  }



  const shareForm = () => {

    if (formName === "") {
      setIsEditable(false)
      setModalTitle("Save or load an existing form.");
      setLeftButtonTitle("Ok");
      setRightButtonTitle("Cancel");
      setShowModal(true);
      return
    }

    setIsEditable(true);
    setModalTitle("Enter Share Code");
    setLeftButtonTitle("Share");
    setRightButtonTitle("Cancel");
    setShowShareModal(true);
  };

  const triggerShare =  () => {


    


    const authCode = modalEntry
  
        const componentsToLoad = JSON.stringify(components);
    let formData = {
      username: user,
      formname: formName,
      authCode: authCode,
      components: componentsToLoad,
      token: ''
    };
    
    
      axios.post(
        `${BASE_URL}updatecode`, formData,{
          headers: {
            Authorization: "Bearer " + auth.token,
          },
          
        }
      ).then( res => handleSuccesCreate(authCode, res)).catch(err => handleError("Unable To Create Share Code."));

 
  };
  const handleShareModal = () => {
    triggerShare();
  };

  /* add modal Config */

  const addComponent = (options) => {
    setIsEditable(true)
    setModalTitle("Enter Component Title");
    setLeftButtonTitle("Create Component")
    setRightButtonTitle("Cancel")
    setShowNewComponentModal(true)
    setModalTemp(options)
    return
  };

  const triggerAdd =  () => {
    const newComponents = { ...components };
    newComponents[modalEntry] = modalTemp;
  
    setComponents(newComponents);
    setShowNewComponentModal(false);
    return


  };
  const handleAddModal = () => {
    triggerAdd();
  };








  return (
    <Box width="inherit" overflow="auto">
      <Box display="block">
        <Box display="flex" justifyContent="flex-start" p={2}>
          {width > 700 ? (
            <Box display="flex">
              <Button
                variant="contained"
                component="label"
                sx={{
                  gridRow: "1",
                  gridColumn: "7",

                  minHeight: "3rem",
                  maxHeight: "3rem",
                  paddingX: "2rem",
                  margin: "1.5rem",
                  color: colors.grey[500],
                  backgroundColor: colors.primary[700],
                }}
                endIcon={<NoteAddIcon />}
                onClick={() => newForm()}
                
              >
                Create New Form
              </Button>

              <Button
                variant="contained"
                component="label"
                sx={{
                  gridRow: "1",
                  gridColumn: "7",

                  minHeight: "3rem",
                  maxHeight: "3rem",
                  paddingX: "2rem",
                  margin: "1.5rem",
                  color: colors.grey[500],
                  backgroundColor: colors.primary[700],
                }}
                endIcon={<SaveIcon />}
                onClick={() => saveForm()}
              >
                Save Form
              </Button>

              <Button
                variant="contained"
                component="label"
                sx={{
                  gridRow: "1",
                  gridColumn: "7",

                  minHeight: "3rem",
                  maxHeight: "3rem",
                  paddingX: "2rem",
                  margin: "1.5rem",
                  color: colors.grey[500],
                  backgroundColor: colors.primary[700],
                }}
                endIcon={<FolderOpenIcon />}
                onClick={() => openForm()}
              >
                Load Form
              </Button>
              <Button
                variant="contained"
                component="label"
                sx={{
                  gridRow: "1",
                  gridColumn: "7",

                  minHeight: "3rem",
                  maxHeight: "3rem",
                  paddingX: "2rem",
                  margin: "1.5rem",
                  color: colors.grey[500],
                  backgroundColor: colors.primary[700],
                }}
                endIcon={<IosShareIcon />}
                onClick={() => shareForm()}
              >
                Share Access Code
              </Button>
            </Box>
          ) : (
            // Here is the else
            //new form
              <Box display="flex">
                {/**New Form */}
              <Button
                component="label"
                sx={{
                  color: colors.grey[500],
                }}
                endIcon={<NoteAddIcon />}
                onClick={() => newForm()}
              ></Button>

              {/**Save Form */}
              <Button
                component="label"
                sx={{
                  color: colors.grey[500],
                }}
                endIcon={<SaveIcon />}
                onClick={() => saveForm()}
              ></Button>

                {/*Open Form*/}
              <Button
                component="label"
                sx={{
                  color: colors.grey[500],
                }}
                endIcon={<FolderOpenIcon />}
                onClick={() => openForm()}
                ></Button>
                
                {/*Share Form*/}
              <Button
                component="label"
                sx={{
                  color: colors.grey[500],
                }}
                endIcon={<IosShareIcon />}
                onClick={() => shareForm()}
              ></Button>
            </Box>
          )}
        </Box>


        {/* New Modal setings */}

        <GeneralModal
          title={modalTitle}
          leftButtonTitle={leftButtonTitle}
          rightButtonTitle={rightButtonTitle}
          isEditable={isEditable}
          showModal={showNewModal}
          handleModalEntry={handleModalEntry}
          onCancel={setShowNewModal}
          onAccept={handleOpenModal}
        />
        





        {/* Save Modal setings */}

        <GeneralModal
          title={modalTitle}
          leftButtonTitle={leftButtonTitle}
          rightButtonTitle={rightButtonTitle}
          isEditable={isEditable}
          showModal={showSaveModal}
          handleModalEntry={handleModalEntry}
          onCancel={setShowSaveModal}
          onAccept={handleSaveModal}
        />



                {/* Load Modal setings */}

                <GeneralModal
          title={modalTitle}
          leftButtonTitle={leftButtonTitle}
          rightButtonTitle={rightButtonTitle}
          isEditable={isEditable}
          showModal={showLoadModal}
          handleModalEntry={handleModalEntry}
          onCancel={setShowLoadModal}
          onAccept={handleLoadModal}
        />

        {/* Share Modal setings */}

        <GeneralModal
          title={modalTitle}
          leftButtonTitle={leftButtonTitle}
          rightButtonTitle={rightButtonTitle}
          isEditable={isEditable}
          showModal={showShareModal}
          handleModalEntry={handleModalEntry}
          onCancel={setShowShareModal}
          onAccept={handleShareModal}
        />


{/* Add component Modal setings */}
<GeneralModal
          title={modalTitle}
          leftButtonTitle={leftButtonTitle}
          rightButtonTitle={rightButtonTitle}
          isEditable={isEditable}
          showModal={showNewComponentModal}
          handleModalEntry={handleModalEntry}
          onCancel={setShowNewComponentModal}
          onAccept={handleAddModal}
        />



        {/*General Modal */}
        <GeneralModal
          title={modalTitle}
          leftButtonTitle={leftButtonTitle}
          rightButtonTitle={rightButtonTitle}
          isEditable={isEditable}
          showModal={showModal}
          handleModalEntry={handleModalEntry}
          onCancel={setShowModal}
          onAccept={handleGeneralModal}
        />

        <Box>
          <Box display="flex" sx={{ justifyContent: "center" }}>
            <Box
              sx={{
                height: "100%",
              }}
            >
              {Object.entries(components).map(([key, value]) => {
                let type = value;
                let title = key;

                let boxKey = key + value;

                return type === "New Image Input" ? (
                  <Box key={boxKey} p="1rem">
                    <Box
                      display="flex"
                      sx={{
                        justifyContent: "flex-end",
                      }}
                    >
                      <IconButton
                        aria-label="delete"
                        id={title}
                        onClick={(e) => handleComponentDelete(e)}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    </Box>
                    <RequirementBox
                      className={title.replace(" ", "")}
                      title={title}
                      subtitle={`Images For ${title}`}
                      handleChange={() => {}}
                    />{" "}
                  </Box>
                ) : (
                  <Box key={boxKey} p="1rem">
                    <Box
                      display="flex"
                      sx={{
                        justifyContent: "flex-end",
                      }}
                    >
                      <IconButton
                        aria-label="delete"
                        id={title}
                        onClick={(e) => handleComponentDelete(e)}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    </Box>
                    <StandardBox
                      className={title}
                      key={title}
                      title={title}
                      subtitle={`${title}`}
                      getComment={() => {}}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingX: "1rem",
            }}
          >
            <NewComponentBox
              handleNewComponentModal={addComponent}
              modalEntry={modalEntry}
            />
          </Box>

          <Box
            sx={{
              paddingX: "5.5rem",
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};
export default FormCreate;
