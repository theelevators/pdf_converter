import { Box, useTheme, Typography, Button, TextField } from "@mui/material";

import { tokens } from "../theme";

export default function ModalContent({
  title,
  leftButtonTitle,
  rightButtonTitle,
  onClose,
  onAccept,
  isEditable,
  handleModalEntry,
  val
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const modalStyles = {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    padding: "50px",
    backgroundColor: colors.greenAccent[500],
    zIndex: 1000,
  };
  const overlayStyles = {
    position: "fixed",

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.7)",
    zIndex: 1000,
  };

  return (
    <Box sx={overlayStyles} className="modal">

        <Box sx={modalStyles}>

        
        {
          isEditable ? <Box display="flex" flexDirection="column">
          <Box
            sx={{
              gridColumn: "span 6",
              gridRow: "1",
              marginBottom: "1rem",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: colors.grey[100],
              }}
            >
              {title}
            </Typography>
          </Box>

          <TextField
            id="standard-textarea"
            multiline
              variant="standard"
              onBlur={ (e) => e ? handleModalEntry(e) : null}
            value={val}
            sx={{
              gridColumn: "span 6",
              gridRow: "2",
              color: colors.greenAccent[500],
              marginBottom: ".5rem",
              height: "1/2fr",
            }}
          ></TextField>
          </Box>
            :           <Typography
            variant="h8"
            fontWeight="bold"
            sx={{
              color: colors.grey[100],
            }}
          >
            {title}
        </Typography>
        }


          <Box display="flex" pt={"1rem"} justifyContent="center">
            <Button
              size="small"
              sx={{
                width: "6rem",
                marginRight: "1rem",
              }}
              variant="contained"
              onClick={onAccept}
            >
              {leftButtonTitle}
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                width: "6rem",
                marginLeft: "1rem",
              }}
              onClick={onClose}
            >
              {rightButtonTitle}
            </Button>
          </Box>
        </Box>
      

      
    </Box>
  );
}
