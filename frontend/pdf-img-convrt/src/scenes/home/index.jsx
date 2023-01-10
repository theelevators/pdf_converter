import React from "react";
import RequirementBox from "../../components/ReqBox";
import CommentBox from "../../components/CommentBox";
import Header from "../../components/Header";
import { Box } from "@mui/material";

const questions = [
  "Bedroom 1",
  "Bathroom 1",
  "Kitchen 1",
  "Garage 1",
  "Laundry Room 1",
  "Patio 1",
  "Dinning Room 1",
  "Bedroom 3",
];

const HomePage = () => {
  return (
    <Box>
      <Header
        title="Final Walk Trough Submission Form"
        subtitle="Please completely fill the form before submitting"
      />

      {questions.map((e) => {
        return (
          <RequirementBox
            title={e}
            subtitle={`Please uploade the images for ${e}`}
          />
        );
      })}
      <CommentBox
        title="Additional Comments"
        subtitle="Please Include Any Additional Comments"
        bLabel="Submit"
      />
    </Box>
  );
};

export default HomePage;
