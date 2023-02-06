import React, { useState } from "react";
import { useTheme, Box, Button, Paper, InputAdornment, IconButton, TextField } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { tokens } from "../../theme";
import Login from "@mui/icons-material/Login";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';








function LoginPage({handleUserName,handlePassword, handleLogin}) {
 
  const [showPassword, setShowPassword] = useState(false);
const handleClickShowPassword = () => setShowPassword(!showPassword);
const handleMouseDownPassword = () => setShowPassword(!showPassword)


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
      <Box
          sx={{
              
              height:"100vh",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
          }}
    >
      <Paper
              
              elevation={12}
        sx={{
            backgroundColor: colors.greenAccent[500],
            padding: "1rem",
            margin: "1.5rem",
            height:"250px",
            display:"flex",
            justifyContent:"center",
            alignItems: "center",
            maxWidth: "300px",
            minWidth:"200px"
              }}

      >
              <Box
                  px=".8rem"
                  py="1rem"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
                      gridTemplateRows: "repeat(4, 3/4fr)",
            
                  }}
                  pt="1rem"
                  rowGap="1rem"
              >
                
                  <AccountCircleIcon
                      
                      sx={
                          {
                              gridColumn: "4",
                              gridRow: "1",
                              fontSize: "3rem",
                              color: colors.grey[300]
                          }
                  }/>
          <TextField
            id="standard-textarea"
            placeholder="User Name"
            variant="standard"
            onBlur={(e)=> e ? handleUserName(e) : null}
                      
            sx={{
              gridColumn: "span 6",
              gridRow: "2",
              color: colors.greenAccent[500],
                
                marginTop: ".5rem",
                marginBottom: ".5rem",
                marginX: "1.5rem",
              height: "1/2fr",
            }}
          ></TextField>

          <TextField
            id="standard-textarea"
            type={showPassword ? "text" : "password"}
            
            placeholder="Password"
            variant="standard"
            onBlur={(e)=> e ? handlePassword(e) : null}
            sx={{
              gridColumn: "span 6",
              gridRow: "3",
              color: colors.blueAccent[500],
              marginTop: ".5rem",
              marginBottom: "1rem",
                marginX: "1.5rem",
              height: "1/2fr",
            }}
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          >




          </TextField>
          <Button
            variant="contained"
            component="label"
            onClick={()=>{handleLogin()}}
            sx={{
              gridRow: "4",
              gridColumn: "5",
              width: "140%",
              minHeight: "2rem",
              maxHeight: "2rem",
              color: colors.grey[300],
            
                      }}
                      endIcon={<Login/>}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;
