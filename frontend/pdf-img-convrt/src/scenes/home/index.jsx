import { React, useState } from "react";
import RequirementBox from "../../components/ReqBox";
import CommentBox from "../../components/CommentBox";
import StandardBox from "../../components/standardBox";
import Header from "../../components/Header";
import { Box } from "@mui/material";

const requiredInfo = ["Email", "Name", "Agent Name", "Agent Comments"];

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

// const sendFiles = async () => {
//   const myFiles = document.getElementById("myFiles").files;
//   const property = document.getElementById("property_addrs").value
//   const formData = new FormData();
//   property.replace(' ', '_');
//   if (!myFiles.length) return;
//   Object.keys(myFiles).forEach((key) => {
//     formData.append(myFiles.item(key).name, myFiles.item(key));
//   });
//   formData.append('property', property);
//   const response = await fetch("http://localhost:3000/upload", {
//     method: "POST",
//     body: formData,
//   });
//   const json = await response.json();
//   console.log(json.message);
// };

const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [comments, setComments] = useState({});

  const getSelectedFiles = (file) => {
    let new_files = [...selectedFile];

    if (!selectedFile.includes(file)) {
      new_files.push(file);
    }
    setSelectedFile(new_files);

    console.log(new_files);
  };

  const getComments = (entry) => {
    let currentComments = { ...comments };
    let id = entry.target.placeholder;
    currentComments[id] = entry.target.value;
    setComments(currentComments);

    console.log(currentComments);
  };

  return (
    <Box>
      <Header
        title="Final Walk Trough Submission Form"
        subtitle="Please completely fill the form before submitting"
      />
      {requiredInfo.map((e) => {
        return (
          <StandardBox
            className={e}
            key={e}
            title={e}
            subtitle={`${e}`}
            getComment={getComments}
          />
        );
      })}

      {questions.map((e) => {
        return (
          <RequirementBox
            className={e.replace(" ", "")}
            key={e}
            title={e}
            subtitle={`Images For ${e}`}
            handleChange={getSelectedFiles}
          />
        );
      })}
      <CommentBox
        className="additional"
        title="Additional Comments"
        subtitle="Additional Comments"
        bLabel="Submit"
      />
    </Box>
  );
};

export default HomePage;
