import { React, useState } from "react";
import RequirementBox from "../../components/ReqBox";
import CommentBox from "../../components/CommentBox";
import StandardBox from "../../components/standardBox";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SubmitBox from "../../components/SubmitBox";


const requiredInfo = [
  "Address",
  "Email",
  "Name",
  "Agent Name",
];

const questions = [
  "Load your images",

];
const BASE_URL = process.env.REACT_APP_BASE_URL;

const TestPage = () => {
  const [selectedFiles, setSelectedFile] = useState([]);
  
  const [comments, setComments] = useState({});
  const navigate = useNavigate();
  const getSelectedFiles = (file) => {
    let new_files = [...selectedFiles];

    Object.values(file).forEach((e) => {
      new_files.push(e);
    });

    setSelectedFile(new_files);
  };

  const getComments = (entry) => {
    let currentComments = { ...comments };
    let id = entry.target.placeholder.replace(" ", "_").toLowerCase();
    currentComments[id] = entry.target.value;
    setComments(currentComments);
  };

  const sendSubmission = async (query, formFiles) => {
    let formData = new FormData();

    formFiles.forEach((e) => {
      formData.append("files", e);
    });
    
    try {
      const response = await axios.post(
        `${BASE_URL}formsubmission/${query}`,
        formData,
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmission = () => {
    const formInfo = { ...comments };
    const formFiles = [...selectedFiles];
    const query = `?address=${formInfo.address}&name=${formInfo.name}&agent_name=${formInfo.agent_name}&agent_comments=${formInfo.agent_comments}&additional_comments=${formInfo.additional_comments}&email=${formInfo.email}`;
    let email = comments['email']
    let validEmails = ['@gmail.com', '@outlook.com', '@hotmail.com', '@yahoo.com']
    
    if (!email) {
      alert('A valid email is needed')
      return
    }
    if (!validEmails.some(e => email.includes(e))) {
      alert('A valid email is needed')
      return
    
    }
    sendSubmission(query, formFiles);
    navigate('/success')
  };

  return (
    <Box display="flex" sx={{justifyContent: "center"}}>
    <Box
      paddingTop="1.5rem" maxWidth="800px"
      minWidth="300px"
    >
      <Header
        title="Try it for yourself!"
        subtitle="Enter mock data with your valid email and get a pdf of the uploaded images."
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
      <SubmitBox
        handleSubmission={handleSubmission}
              />
    </Box></Box>
  );
};

export default TestPage;
