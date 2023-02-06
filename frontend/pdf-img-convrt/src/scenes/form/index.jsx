import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SaveIcon from "@mui/icons-material/Save";
import { useState, useEffect } from "react";
import IosShareIcon from '@mui/icons-material/IosShare';
import IconButton from "@mui/material/IconButton";
import RequirementBox from "../../components/ReqBox";
import StandardBox from "../../components/standardBox";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import axios from "axios";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import NewComponentBox from "./../../components/AddComponentBox";
import useWindowDimensions from './../../util/utilities';
import GeneralModal from "../../components/Modal";
import ShareIcon from '@mui/icons-material/Share';
import { useParams } from "react-router-dom";



const BASE_URL = process.env.REACT_APP_BASE_URL;

const FormCreate = ({ userToken }) => {
  

 const myAuth = {
    headers: {
       Authorization: "Bearer " + userToken
    }
 }

  const { id } = useParams();
  const user = id



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showModal, setShowModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [leftButtonTitle, setLeftButtonTitle] = useState('');
  const [rightButtonTitle, setRightButtonTitle] = useState('');
  const [isLeftSelected, setIsLeftSelected] = useState(false)
  const [isRightSelected, setIsRightSelected] = useState(false)
  const [authCode, setAuthCode] = useState('');
  const [modalEntry, setModalEntry] = useState('');
  const [modalTemp, setModalTemp] = useState('');
  
  const [components, setComponents] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [formName, setFormName] = useState("");
  const { height, width } = useWindowDimensions();


  const handleComponentDelete = (e) => {
    const target = e.currentTarget.id;
    const currentComponents = { ...components };
    delete currentComponents[target];

    setComponents(currentComponents);
  };

  const saveComponents = async (loadedComponents) => {
    let formData = {

      "username" : user,
      "formName" : formName,
      "authCode" : authCode,
      "components" : loadedComponents
      
    }
    

    if (!isLoaded) {
      try {
        const response = await axios.post(
          `${BASE_URL}user/saveform`,
          formData
          ,
          {
            headers: {
              Authorization: "Bearer " + userToken
            }
            
          }
        );
        setModalTitle("Form has been saved!")
        setLeftButtonTitle("Ok")
        setRightButtonTitle('Cancel')
        setShowModal(true)
        handleReset()
      } catch (error) {
        console.error(error);
      }
      
    }

    if (isLoaded) {
      try {
        const response = await axios.patch(
          `${BASE_URL}user/updateform/?name=${formName}`,
          formData
          ,
          {
            headers: {
              Authorization: "Bearer " + userToken
            }
            
          }
          
        );

        setModalTitle("Form has been saved!")
        setLeftButtonTitle("Ok")
        setRightButtonTitle('Cancel')
        setShowModal(true)
        handleReset()
      } catch (error) {
        console.error(error);
      }
    }

    setModalTitle("Form has been saved!")
    setLeftButtonTitle("Ok")
    setRightButtonTitle('Cancel')
    setShowModal(true)
    handleReset()
    return

  };

  const getForm = async (formName) => {



    try {
      const response = await axios.get(
        `${BASE_URL}user/loadform/?name=${formName}`,
        myAuth
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  const handleEditable = (prompt) => {
    setIsEditable(true)
    setModalTitle(prompt)
    setLeftButtonTitle('Open')
    setRightButtonTitle('Cancel')
    setShowModal(true)
    return

  }





  const handleOpen = async () => {
    
    if (isLoaded) {
      return
    }
    
    
    if (formName === null) {

        handleEditable("Enter the name of the form.");
        
          return
    }
    
    if (formName === '') {
      
        
        handleEditable("Enter the name of the form.");
  

      return
    }

    
      
      if (formName !== "") {
        const formMessage = await getForm(formName);
             
        if (formMessage.status !== 200) {
                 
          setIsEditable(true)
          setModalTitle("Form Not Found. Try Again.")
          setLeftButtonTitle('Open')
          setRightButtonTitle('Cancel')
          setShowModal(true)
          return
  
        }

        if (formMessage.data.error) {
          setIsEditable(true)
          setModalTitle("Form Not Found. Try Again.")
          setLeftButtonTitle('Open')
          setRightButtonTitle('Cancel')
          setShowModal(true)
          return
        }
  
        const messageComponents = formMessage.data;
        const newComponents = JSON.parse(messageComponents);
  
        setComponents(newComponents);
        setIsLoaded(true)
        setFormName(formName)
        return


      }
      
      return

  };


  const handleShareForm = () => {
    if (formName !== '') {
      
      if (authCode === "") {
        setIsEditable(true)
        setModalTitle("Enter the share code for this form.")
        setLeftButtonTitle('Create code')
        setRightButtonTitle('Cancel')
        setShowModal(true)
        return
      }

      return
    }
    setIsEditable(false)
    setModalTitle('You cannot share an unsaved form.')
    setLeftButtonTitle('Ok')

    setRightButtonTitle('Dismiss')
    setShowModal(true)
    return
  }


  const handleNewEntry = () => {
    setIsEditable(false)
    setModalTitle('You are about to create a new form. Save all changes before starting.')
    setLeftButtonTitle('New Form')
    setRightButtonTitle('Cancel')
    setShowModal(true)
    return
  }

  const handleEmptyForm = () => {
    setIsEditable(true)
    setModalTitle("Enter the name for this form.")
    setLeftButtonTitle('Save')
    setRightButtonTitle('Cancel')
    setShowModal(true)
    return
    
  }



  const handleEmptyCode= () => {
    setIsEditable(true)
    setModalTitle("Enter the share code for this form.")
    setLeftButtonTitle('Create code')
    setRightButtonTitle('Cancel')
    setShowModal(true)
    return
  }

  const handleModalResponse = async (subtitle) => {

    if (subtitle === 'Save') {
      setIsLeftSelected(true)
      setFormName(modalEntry)
      setModalTemp("")
      setModalEntry("")
      if (authCode === "") {
        handleEmptyCode()
        return
      }
      await handleSave()
      setShowModal(false)
      return
    }


    if (subtitle === 'Open') {
      setIsLeftSelected(true)
      setFormName(modalEntry)
      handleOpen()
      setShowModal(false)
      return
    }

    if (subtitle === 'Ok') {
      setIsLeftSelected(true)
      setShowModal(false)
      return
    }

    if (subtitle === 'Rename') {
      setIsLeftSelected(true)
      setIsEditable(true)
      setModalTitle('Enter the new name for the form')
      setLeftButtonTitle('Save')
      setRightButtonTitle('Cancel')
      setShowModal(true)
      return
    }

    if (subtitle === 'New Form') {
      setIsLeftSelected(true)
      if (isLoaded) {
        handleReset()
        return

      }
      handleReset()
      return
    }
    if (subtitle === 'Create code') {
      setIsLeftSelected(true)
      handleAuthCode(modalEntry)
      await handleSave()
      setShowModal(false)
      return
    }


    
    if (subtitle === 'Continue Save') {
      setIsLeftSelected(true)
      setIsLoaded(true)
      setShowModal(false)
      await handleSave()
      return
      
    }

    

    if (subtitle === 'Create Component') {
      setIsLeftSelected(true)
      setShowModal(false)
      setComponents("")
      handleNewComponent(modalEntry, modalTemp)
      return
    }

    setIsLeftSelected(false)
    setIsRightSelected(false)
    return


  }

  const handleReset = () => {
    setAuthCode('')
    setComponents({})
    setFormName('')
    setIsEditable(false)
    setIsLeftSelected(false)
    setIsLoaded(false)
    setModalTemp('')
    setModalEntry('')
    setModalTitle('')
    setRightButtonTitle('')
    setShowModal(false)
    return
    
  }


  const handleNewComponentModal =  (options) =>  {
    setIsEditable(true)
    setModalTitle("Enter Component Title");
    setLeftButtonTitle("Create Component")
    setRightButtonTitle("Cancel")
    setShowModal(true)
    setModalTemp(options)
    return

  }


  const handleAuthCode = (code) => {
    const new_code = code
    setAuthCode(new_code)
    return
  }


  const handleNewComponent = (entry, options) => {
    const newComponents = { ...components };
    newComponents[entry] = options;

    setComponents(newComponents);
    return
  };


  const handleModalEntry = (entry) => {
    if (entry.target.value !== "") {
      setModalEntry(entry.target.value)
      return entry.target.value
      }
      setIsEditable(false)
      setModalTitle('The Entry Cannot Be Empty')
      setLeftButtonTitle('Ok')

      setRightButtonTitle('Cancel')
    setShowModal(true)
    return
  }


  const handleSave = async () => {
    const formComponents = { ...components };
    
     
    if (formName === "") {
      handleEmptyForm()
      return
    }
    
    if (authCode === "") {
      handleEmptyCode()
      setShowModal(true)
      return
    }

    const componentsToLoad = JSON.stringify(formComponents);

    await saveComponents(componentsToLoad);

    handleReset()
    return
    // window.alert("Form has been saved!");
  };

  

  return (
    <Box width="inherit" overflow="auto">
      <Box display="block">
        <Box display="flex" justifyContent="flex-start" p={2}>
          

     

            {width > 700 ? 
              
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
              onClick={() => handleSave()}
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
              onClick={() => handleOpen()}
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
              onClick={() => handleShareForm()}
            >
              Share Access Code
            </Button>

            </Box>
            :
            
            
            // Here is the else
            //new form
            <Box display="flex">
              <Button
                
                component="label"
                onClick={() => handleNewEntry()}
                
                sx={{

                  color: colors.grey[500],
                  
                }}
                endIcon={<NoteAddIcon />}
              >

                
              </Button>
              
  
              <Button
                
                component="label"
                sx={{

                  color: colors.grey[500],
                  
                }}
                endIcon={<SaveIcon />}
                onClick={() => handleSave()}
              >
                
              </Button>
  
              <Button
                
                component="label"
                sx={{

                  color: colors.grey[500],
                  
                }}
                endIcon={<FolderOpenIcon />}
                onClick={() => handleOpen()}
              >
              </Button>
              <Button
             
              
             component="label"
             sx={{

               color: colors.grey[500],
               
             }}
              endIcon={<IosShareIcon />}
              onClick={() => handleShareForm()}
            >
            </Button>


            </Box>}
            

          
        </Box>
      {/* Modal setings */}

        <GeneralModal
          title={modalTitle}
          leftButtonTitle={leftButtonTitle}
          rightButtonTitle={rightButtonTitle}
          isEditable={isEditable}
          showModal={showModal}
          handleModalEntry={handleModalEntry}
          setShowModal={setShowModal}
          setModalStatus={ handleModalResponse} />
          


      
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
                      getComment={()=>{}}
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

              handleNewComponentModal={handleNewComponentModal}
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
