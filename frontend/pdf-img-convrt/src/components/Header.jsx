import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      m="1rem"
      alignItems="center"
    >
      <Typography variant="h4" color={colors.grey[100]} fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="h6" color={colors.grey[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};
export default Header;
