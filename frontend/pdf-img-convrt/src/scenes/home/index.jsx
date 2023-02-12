import { React } from "react";
import PublishIcon from "@mui/icons-material/Publish";
import Header from "../../components/Header";
import { Box, Button, useTheme } from "@mui/material";
import Login from "@mui/icons-material/Login";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleLogin = () => {
    navigate("/login");
  };

  const handleForms = () => {
    navigate("/forms");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
      }}
    >
      <Header title="Welcome!" subtitle="Please log in or submit a form." />
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <Button
            variant="contained"
            component="label"
            onClick={handleLogin}
            sx={{
              width: "50%",
              margin: "2rem",
              minHeight: "2rem",
              maxHeight: "2rem",
              color: colors.grey[300],
              backgroundColor: colors.greenAccent[600],
            }}
            endIcon={<Login />}
          >
            Login
          </Button>
          <Button
            variant="contained"
            component="label"
            onClick={handleForms}
            sx={{
              width: "50%",
              margin: "2rem",
              minHeight: "2rem",
              maxHeight: "2rem",
              color: colors.primary[800],
              backgroundColor: colors.grey[600],
            }}
            endIcon={<PublishIcon />}
          >
            Submit Form
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
