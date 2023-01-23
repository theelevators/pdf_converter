import { React, useState } from "react";

import CommentBox from "../../components/CommentBox";
import LoginIcon from '@mui/icons-material/Login';
import Header from "../../components/Header";
import { Box } from "@mui/material";




const ConfirmationPage = () => {
    
    return (
        <Box>
        <Header
          title="Thank you for your submission!"
          subtitle="An email has been sent with a copy of the images."
            />
            
      </Box>
    );
};

export default  ConfirmationPage;
