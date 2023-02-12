import { React } from "react";
import Header from "../../components/Header";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";
import PublishIcon from "@mui/icons-material/Publish";
import { tokens } from "../../theme";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleAnotherOne = () => {
    navigate("/forms");
  };

  return (
    <Box paddingTop="5rem">
      <Box>
        <Header
          title="Thank you for your submission!"
          subtitle="A confirmation email has been sent to the form owner"
        />
      </Box>
      <Box display="flex" gap="1rem" justifyContent="center">
        <NavLink
          style={{
            textDecoration: "none",
            color: colors.primary[100],
          }}
          to="/forms"
        >
          <Typography
            variant="h8"
            display="flex"
            alignContent="center"
            alignItems="center"
          >
            Make Another Submission{" "}
            {<PublishIcon sx={{ paddingLeft: ".2rem" }} />}
          </Typography>
        </NavLink>
      </Box>
    </Box>
  );
};

export default ConfirmationPage;
