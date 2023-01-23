import { React, useState } from "react";
import RequirementBox from "../../components/ReqBox";
import CommentBox from "../../components/CommentBox";
import StandardBox from "../../components/standardBox";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from 'react-router-dom';

const requiredInfo = [
  "Address",
  "Email",
  "Name",
  "Agent Name",
  "Agent Comments",
];

const questions = [
  "Kitchen",
  "Patio",
  "Garage",
  "Roof",
  "Walkway",
  "Living Room"
];

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PremierPage = () => {
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
        handleChange={getComments}
        handleSubmission={handleSubmission}
        icon={<SendIcon/>}
      />
    </Box>
  );
};

export default PremierPage;
