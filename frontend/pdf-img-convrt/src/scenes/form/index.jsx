import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SaveIcon from "@mui/icons-material/Save";
import { useState, useEffect } from "react";
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




const BASE_URL = process.env.REACT_APP_BASE_URL;

const FormCreate = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showModal, setShowModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [leftButtonTitle, setLeftButtonTitle] = useState('');
  const [rightButtonTitle, setRightButtonTitle] = useState('');
  const [isLeftSelected, setIsLeftSelected] = useState(false)
  const [isRightSelected, setIsRightSelected] = useState(false)
  const [modalEntry, setModalEntry] = useState('');
  
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

  const saveComponents = async (loadedComponents, formName) => {
    let formData = new FormData();

    formData.append("components", loadedComponents);

    if (!isLoaded) {
      try {
        const response = await axios.post(
          `${BASE_URL}saveform/?name=${formName}`,
          formData,
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      
    }

    if (isLoaded) {
      try {
        const response = await axios.patch(
          `${BASE_URL}updateform/?name=${formName}`,
          formData,
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }




  };

  const getForm = async (formName) => {
    try {
      const response = await axios.get(
        `${BASE_URL}savedform/?name=${formName}`,
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  const handleEditable = (prompt) => {
    setIsEditable(true)
    setModalTitle(prompt)
    setLeftButtonTitle('Ok')
    setRightButtonTitle('Cancel')
    setShowModal(true)


  }





  const handleOpen = async () => {
    const formName = handleEditable("Enter the name of the form.");
    
    if (formName === null ) {
      return
    }
    if (formName === '' ) {
      return
    }
    const formMessage = await getForm(formName);

    if (formMessage.status !== 200) {

      

      setModalTitle("Form Not Found. Try Again.")
      setLeftButtonTitle('Ok.')
      setRightButtonTitle('Cancel')
      setShowModal(true)

    }

    const messageComponents = formMessage.data;
    const newComponents = JSON.parse(messageComponents);

    setComponents(newComponents);
    setIsLoaded(true)
    setFormName(formName)

  };


  const handleShareForm = () => {
    if (formName !== '') {
      
      console.log(formName)
      return
    }
    setIsEditable(false)
    setModalTitle('You cannot share an unsaved form.')
    setLeftButtonTitle('Ok')

    setRightButtonTitle('Dismiss')
    setShowModal(true)
  }






  const handleNewEntry = () => {
    setModalTitle('You are about to create a new form. Save all changes before starting.')
    setLeftButtonTitle('New Form')
    setRightButtonTitle('Cancel')
    setShowModal(true)
  }




  const handleModalResponse = (subtitle) => {

    if (subtitle === 'Save') {
      setIsLeftSelected(true)
      setFormName(modalEntry)
      handleSave()
      setShowModal(false)
    }
    if (subtitle === 'Ok') {
      setIsLeftSelected(true)
      setShowModal(false)
    }
    if (subtitle === 'Yes, New Form') {
      setIsLeftSelected(true)
      setFormName(modalEntry)
      handleSave()
      setShowModal(false)
    }

    if (subtitle === 'Rename') {
      setIsLeftSelected(true)
      setIsEditable(true)
      setModalTitle('Enter the new name for the form')
      setLeftButtonTitle('Save')
      setRightButtonTitle('Cancel')
      setShowModal(true)
    }



    if (subtitle === 'New Form') {
      setIsLeftSelected(true)
      if (isLoaded) {
        setModalTitle('This is a saved form. Are you sure you want to create a new one?')
        setLeftButtonTitle('Yes, New Form')

        setRightButtonTitle('Cancel')
        setShowModal(true)
        setComponents({})
        setIsLoaded(false)
        setShowModal(false)

      }
      setComponents({})
      setIsLoaded(false)
      setShowModal(false)
    }

    setIsLeftSelected(false)
    setIsRightSelected(false)



  }



  const handleNewComponent = (entry, options) => {
    const newComponents = { ...components };
    newComponents[entry] = options;

    setComponents(newComponents);
  };

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


  const handleSave = () => {
    const formComponents = { ...components };
    
     
    if (formName === "") {
      setIsEditable(true)
      setModalTitle("Enter the name for this form.")
      setLeftButtonTitle('Save')
      setRightButtonTitle('Cancel')
      setShowModal(true)
      
      return
    }

    if (formName !== "") {
      setIsEditable(false)
      setModalTitle("Do you want to rename this Form?")
      setLeftButtonTitle('Rename')
      setRightButtonTitle('No')
      setShowModal(true)
      return
    }



    const componentsToLoad = JSON.stringify(formComponents);

    saveComponents(componentsToLoad, formName);

    setIsLoaded(false)
    setComponents([]);
    setModalTitle("Form has been saved!")
    setLeftButtonTitle("Ok")
    setRightButtonTitle('Cancel')
    setShowModal(true)
    // window.alert("Form has been saved!");
  };















  return (
    <Box width="inherit" overflow="auto">
      <Box display="block">
        <Box display="flex" justifyContent="flex-start" p={2}>
          

     

            {width > 400 ? 
              
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
              endIcon={<ShareIcon />}
              onClick={() => handleShareForm()}
            >
              Share Form
            </Button>
            </Box>
            :
            
            
            // Here is the else
            //new form
            <Box display="flex">
              <Button
                
                component="label"
                onClick={() => handleNewEntry(true)}
                
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
              endIcon={<ShareIcon />}
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
              handleNewComponent={(entry, options) =>
                handleNewComponent(entry, options)
              }
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
