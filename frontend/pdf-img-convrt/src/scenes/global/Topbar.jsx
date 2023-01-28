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
import PaletteIcon from '@mui/icons-material/Palette';
import Sidebar from './../global/Sidebar';




const options = [
  "New Image Input",
  "New Question Input",
  
];



const Topbar = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [open, setOpen] = useState(false);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
      setOpen(false);
      
    console.log(options[index]);
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

    return (
        <Box display="flex" width="100%" height="100%" sx={{ backgroundColor: colors.greenAccent[800] }}>
        <Sidebar/>
        <Box width="inherit" >
            
 





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
                            onClick={(event) => handleMenuItemClick(event, index)}
            
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
        >
          Save Form
        </Button>
      </Box>
                </Box>
                </Box>

</Box>
  );
};

export default Topbar;
