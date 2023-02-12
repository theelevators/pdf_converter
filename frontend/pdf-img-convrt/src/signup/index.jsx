import React, { useState } from "react";
import {
  useTheme,
  Box,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { tokens } from "../theme";
import useAuth from "../hooks/useAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";



function SignUpPage() {
  const { setAuth } = useAuth();
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || `/${userName}`;

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'signup',
        { username: userName, password },
        { withCredentials: true },
      );

      const token = response?.data?.token;
      if (!token) {
        const invalid = response?.data?.error;

        
        return;
      }

      setUserName("");
      setPassword("");
      setAuth({ userName, password, token });

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };


  const handleSignUp = async () => {
   
    try {
        const response = await axios.post(
          'signup',
          { username: userName, email,password },
          { withCredentials: true },
        );
  
        
  
        setUserName("");
        setPassword("");
        setEmail("")
        window.alert("Account Successfully Created!")
        navigate("/login", { replace: true })
        
    } catch (err) {
        window.alert(err?.response?.data?.detail)
      }
      
      
      
      
      
  };








  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          backgroundColor: colors.greenAccent[500],
          padding: "1rem",
          margin: "1.5rem",
          height: "325px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "300px",
          minWidth: "250px",
        }}
      >
        
        <Box
          px=".8rem"
          py="1rem"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
              gridTemplateRows: "repeat(5, 3/4fr)",
            textAlign: "center"
          }}
          pt="1rem"
          rowGap="1rem"
        >
                  <Typography
                      variant="h4"
                      sx={{
                        gridColumn: "span 7",
                        gridRow: "1",
                        
          
                                    
                        
                        
                  }}>
                      Create New Account
</Typography>

          <TextField
                      id="standard-textarea"
                      type="email"
            placeholder="Email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            sx={{
              gridColumn: "span 7",
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
            placeholder="User Name"
            variant="standard"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            sx={{
              gridColumn: "span 7",
              gridRow: "3",
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            sx={{
              gridColumn: "span 7",
              gridRow: "4",
              color: colors.blueAccent[500],
              marginTop: ".5rem",
              marginBottom: "1rem",
              marginX: "1.5rem",
              height: "1/2fr",
            }}
            InputProps={{
              // <-- This is where the toggle button is added.
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
              ),
            }}
          ></TextField>

          <Button
            variant="contained"
            component="label"
            sx={{
              gridRow: "5",
              gridColumn: "4",
              width: "250%",
              minHeight: "2rem",
              maxHeight: "2rem",
              color: colors.grey[300],
            }}
            endIcon={<PersonAddIcon />}
            onClick={()=>handleSignUp()}
          >
            Sign Up
          </Button>

        </Box>
      </Paper>
    </Box>
  );
}

export default SignUpPage;
