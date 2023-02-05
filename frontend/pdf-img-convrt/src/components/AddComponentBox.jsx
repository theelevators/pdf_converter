import {
  Box,
  useTheme,
  Button,
  ClickAwayListener,
  Popper,
  Paper,
  MenuItem,
  MenuList,
  Grow,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { tokens } from "./../theme";
import { useRef, useState } from "react";

const options = ["New Question Input", "New Image Input"];



const NewComponentBox = ({handleNewComponent}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [open, setOpen] = useState(false);


  
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };





  const handleMenuItemClick = (event, index) => {
    event.preventDefault();
    setSelectedIndex(index);
    setOpen(false);

    
    const newEntry = window.prompt("Enter Entry Title");

    handleNewComponent(newEntry, options[index]);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };





  return (
    <Box
      sx={{
        
        display: "flex",

        justifyContent: "flex-end",
      }}
    >
      <Button
        component="label"
        size="large"
        sx={{
          gridColumn: "6",
          gridRow: "3",
          borderRadius: "75%",
          width: "0",
          height: "0",

          color: colors.greenAccent[300],
        }}
        ref={anchorRef}
        endIcon={<AddCircleIcon />}
        onClick={handleToggle}
      />
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
    </Box>
  );
};

export default NewComponentBox;
