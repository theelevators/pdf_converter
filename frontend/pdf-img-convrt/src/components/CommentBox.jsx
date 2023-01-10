import React from "react";
import { Box, Typography, useTheme, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { tokens } from "./../theme";

const CommentBox = ({ title, subtitle, icon, bLabel }) => {
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
          gridTemplateRows: "repeat(3, 3/4fr)",
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
          placeholder="Enter Comments"
          multiline
          variant="standard"
          sx={{
            gridColumn: "span 6",
            gridRow: "2",
            color: colors.greenAccent[500],
            marginBottom: ".5rem",
            height: "1/2fr",
          }}
        >
          {subtitle}
        </TextField>
        <Button
          variant="contained"
          component="label"
          sx={{
            gridColumn: "5",
            gridRow: "3",
            width: "180%",
            color: colors.greenAccent[500],
            height: "1.5rem",
          }}
          endIcon={<SendIcon />}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CommentBox;
