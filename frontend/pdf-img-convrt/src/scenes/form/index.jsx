import {
  Box,
  Button,
  useTheme,
  ClickAwayListener,
  Popper,
  Paper,
  MenuItem,
  MenuList,
  Grow,
} from "@mui/material";
import { tokens } from "../../theme";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SaveIcon from "@mui/icons-material/Save";
import { useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Sidebar from "./../global/Sidebar";
import Header from "../../components/Header";
import RequirementBox from "../../components/ReqBox";
import StandardBox from "../../components/standardBox";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SubmitBox from "../../components/SubmitBox";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const options = ["New Question Input", "New Image Input"];

const FormCreate = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [open, setOpen] = useState(false);
  const [components, setComponents] = useState({});

  const getComments = (entry) => {};

  const handleMenuItemClick = (event, index) => {
    event.preventDefault();
    setSelectedIndex(index);
    setOpen(false);
    const newEntry = window.prompt("Enter Entry Title");

    const newComponents = { ...components };
    newComponents[newEntry] = options[index];
    setComponents(newComponents);
  };

  const handleComponentDelete = (e) => {
    const target = e.currentTarget.id;
    const currentComponents = { ...components };
    delete currentComponents[target];

    setComponents(currentComponents);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const saveComponents = async (loadedComponents, formName) => {
    let formData = new FormData();

    formData.append("components", loadedComponents);

    try {
      const response = await axios.post(
        `${BASE_URL}saveform/?name=${formName}`,
        formData,
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = () => {
    const formComponents = { ...components };
    const formName = window.prompt("Enter the name for this form.")
      const componentsToLoad = JSON.stringify(formComponents);
      saveComponents(componentsToLoad, formName);
    
  };

  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      sx={{ backgroundColor: colors.greenAccent[800] }}
    >
      <Sidebar />
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
                }}
                ref={anchorRef}
                endIcon={<AddBoxIcon />}
                onClick={handleToggle}
              >
                Add Entry
              </Button>
              <Popper
                sx={{
                  zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" autoFocusItem>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              disabled={index === 2}
                              selected={index === selectedIndex}
                              onClick={(event) =>
                                handleMenuItemClick(event, index)
                              }
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>

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
                }}
                endIcon={<SaveIcon />}
                onClick={() => handleSave()}
              >
                Save Form
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
                <Header
                  title="Final Walk Trough Submission Form"
                  subtitle="Please completely fill the form before submitting"
                />

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
                paddingX: "5.5rem",
              }}
            >
              <SubmitBox handleSubmission={() => {}} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default FormCreate;
