import React from "react";
import { Box, useTheme, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { tokens } from "./../theme";

const SubmitBox = ({ handleSubmission, buttonTitle="Submit"}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <Box
      m="1rem"
      p=".8rem"
      borderRadius="5px"
        
    >
      
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
                  gridTemplateRows: "repeat(3, 3/4fr)",
          
        }}
      >
        <Button
          variant="contained"
          component="label"
          sx={{
            gridColumn: "6",
            gridRow: "3",
              width: "100%",
            backgroundColor:colors.greenAccent[200],
            color: colors.greenAccent[500],
            height: "1.5rem",
          }}
          endIcon={<SendIcon/>}
          onClick={() => handleSubmission()}
        >
          {buttonTitle}
        </Button>
      </Box>
    </Box>
  );
};

export default SubmitBox;
