import React from "react";
import { Box, Typography, useTheme, Button, TextField } from "@mui/material";

import { tokens } from "./../theme";

const StandardBox = ({ title, subtitle, getComment }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      m="1rem"
      p=".8rem"
      borderRadius="5px"
      sx={{
        backgroundColor: colors.grey[500],
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(2, 3/4fr)",
        }}
      >
        <Box
          sx={{
            gridColumn: "span 6",
            gridRow: "1",
            marginBottom: "1rem",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: colors.grey[100],
            }}
          >
            {title}
          </Typography>
        </Box>

        <TextField
          id="standard-textarea"
          placeholder={subtitle}
          onBlur={(e) => getComment(e)}
          multiline
          variant="standard"
          sx={{
            gridColumn: "span 6",
            gridRow: "2",
            color: colors.greenAccent[500],
            marginBottom: ".5rem",
            height: "1/2fr",
          }}
        ></TextField>
      </Box>
    </Box>
  );
};

export default StandardBox;
