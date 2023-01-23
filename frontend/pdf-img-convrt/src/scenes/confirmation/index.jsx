import { React} from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";




const ConfirmationPage = () => {
    
    return (
        <Box paddingTop="5rem">
        <Header
          title="Thank you for your submission!"
          subtitle="An email has been sent with a copy of the images."
            />
            
      </Box>
    );
};

export default  ConfirmationPage;
