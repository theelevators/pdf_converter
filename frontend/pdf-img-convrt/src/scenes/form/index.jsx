import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import RequirementBox from "../../components/ReqBox";
import StandardBox from "../../components/standardBox";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import axios from "axios";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import NewComponentBox from "./../../components/AddComponentBox";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const FormCreate = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const [components, setComponents] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [formName, setFormName] = useState("");

  const getComments = (entry) => {};

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

  const handleOpen = async () => {
    const formName = window.prompt("Enter the name of the form.");
    
    if (formName == null ) {
      return
    }
    const formMessage = await getForm(formName);

    if (formMessage.status != 200) {
      window.alert("Form Not Found. Try Again.");
    }

    const messageComponents = formMessage.data;
    const newComponents = JSON.parse(messageComponents);

    setComponents(newComponents);
    setIsLoaded(true)
    setFormName(formName)

  };

  const handleNewComponent = (entry, options) => {
    const newComponents = { ...components };
    newComponents[entry] = options;

    setComponents(newComponents);
  };

  const handleSave = () => {
    const formComponents = { ...components };
    


    const newFormName = isLoaded ? formName : window.prompt("Enter the name for this form.");
    
    if (newFormName == null) {
      window.alert("Form Not Saved!");
      return
    }
    const componentsToLoad = JSON.stringify(formComponents);

    saveComponents(componentsToLoad, newFormName);


    setIsLoaded(false)
    setComponents([]);
    window.alert("Form has been saved!");
  };

  return (
    <Box width="inherit" overflow="auto">
      <Box display="block">
        <Box display="flex" justifyContent="flex-start" p={2}>
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
              endIcon={<AddBoxIcon />}
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
          </Box>
        </Box>
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

                return type == "New Image Input" ? (
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
                      getComment={getComments}
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
              paddingX: "5.5rem",
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
