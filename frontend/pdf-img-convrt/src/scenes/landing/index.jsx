import { React, useState } from "react";

import CommentBox from "../../components/CommentBox";
import LoginIcon from '@mui/icons-material/Login';
import Header from "../../components/Header";
import { Box} from "@mui/material";

import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";






const Landing = () => {
    const [authCode, setAuthCode] = useState("");
    const navigate = useNavigate();

    const getCode = (e) => {
        const currentCode = e.target.value; 
        setAuthCode(prevCode => currentCode);
      };

    const handleClick = () => {
        const getRoute = async () => {
          let query = authCode;
          


          try {
            if (!query) {
              alert('The access code you entered is not valid.')
              return
            }
                const response = await axios.get(
                  `form/?id=${query}`
                );
              const message = response.data
              const route = message['route'];
              if (!route.includes('/')) {
                alert('The access code you entered is not valid.')
                return
              }
                navigate(route)
                
            } catch (error) {

              alert('Looks like there was an error. Please try again or use different code.')
              return
              }
      }
      


        getRoute()

    }

    return (
        <Box paddingTop="10rem">
        <Header
          title="Welcome!"
          subtitle="Please enter the provided access code to continue."
            />
            <Box
            sx={{display:"flex", width: "100%", justifyContent: "center"}}>
            <CommentBox
                
                buttonTitle="Continue"
                    icon={<LoginIcon />}
                    handleSubmission={handleClick}
                    handleChange = {getCode}
            />
            </Box>
      </Box>
    );
};

export default  Landing;
