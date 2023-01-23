import { React, useState } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "./../theme";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const RequirementBox = ({ title, subtitle, handleChange }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      m="1rem"
      p=".8rem"
      borderRadius="5px"
      sx={{
        backgroundColor: colors.greenAccent[500],
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          {/* {icon} */}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              color: colors.greenAccent[100],
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)" }}>
        <Typography
          variant="h6"
          sx={{
            gridRow: "1",
            gridColumn: "span 6",
            color: colors.greenAccent[500],
          }}
        >
          {subtitle}
        </Typography>

        <Button
          variant="contained"
          component="label"
          sx={{
            gridRow: "1",
            gridColumn: "7",
            width: "140%",
            minHeight: "2rem",
            maxHeight: "2rem",
            color: colors.grey[500],
          }}
          endIcon={<PhotoCamera />}
        >
          Upload
          <input
            className="file-input"
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => handleChange(e.target.files)}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default RequirementBox;
