import React from "react";
import { Box, Typography, useTheme, Button, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import ReplayIcon from '@mui/icons-material/Replay';
const NotFound = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box padding="1rem">
        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{
            color: colors.greenAccent[100],
          }}
        >
          404 Error Page Not Found
        </Typography>
        <Box>
          <Button
          >
      <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            color: colors.greenAccent[100],
            paddingX: "1rem"
          }}
          
        >
          Return To Main Page 
          
          
          
          </Typography>
            <IconButton sx={{
            backgroundColor: colors.greenAccent[100],
            
          }}
          size="small">
            <Link to="/submissions">
            <ReplayIcon />
              </Link>

            </IconButton>
          </Button>



        </Box>
        
    </Box>
  );
};

export default NotFound;
