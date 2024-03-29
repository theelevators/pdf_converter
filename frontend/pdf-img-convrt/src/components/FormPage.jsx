import { React, useState ,useEffect} from "react";
import RequirementBox from "./ReqBox";
import StandardBox from "./standardBox";
import Header from "./Header";
import { Box } from "@mui/material";
import SubmitBox from "./SubmitBox";
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios'



const FormPage = () => {
  const [selectedFiles, setSelectedFile] = useState([]);
  const [components, setComponents] = useState({});
  const [comments, setComments] = useState({});
  const navigate = useNavigate();

  const { id } = useParams()
  const pageName = id

  
  const getForm = async () => {
    
    try {
      const response = await axios.get(
        `components/?id=${pageName}`
      )
      return response
      
    } catch (error) {
    return error
  }
  
  }
  
  const handleOpen = async () => {
    
    const formName = pageName
    const formMessage = await getForm(formName)
  
    if (formMessage.status != 200) {
      
    }


    const messageComponents = formMessage.data;
    const newComponents = JSON.parse(messageComponents)
    
    setComponents(newComponents)

  }

  useEffect(() => {
    handleOpen().then();
  }, []);



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




  const handleGeneric = async () => {
    const formInfo = JSON.stringify(comments);
    const formFiles = [...selectedFiles];
    const formName = pageName
    const query = `?name=${formName}&entries=${formInfo}`;

    let formData = new FormData();

    formFiles.forEach((e) => {
      formData.append("files", e);
    });

    if (formFiles.length > 0) {
      try {
        const response = await axios.post(
          `form/${query}`,formData
           
        );
        navigate('/forms/success')
      } catch (error) {
        console.error(error);
      }

    }

    if (formFiles.length < 1) {
      try {
        const response = await axios.post(
          `simpleform/${query}`,formData
           
        );
        navigate('/forms/success')
      } catch (error) {
        console.error(error);
      }


    }


  }







  return (
    <Box display="flex" sx={{justifyContent: "center"}}>
    <Box>
      <Header
        title="Final Walk Trough Submission Form"
        subtitle="Please completely fill the form before submitting"
      />
{Object.entries(components).map(([key, value]) => {
                  let type = value;
                  let title = key;

                  let boxKey = key + value;

                  return type == "New Image Input" ? (
                    <Box key={boxKey} p="1rem">
                      <RequirementBox
                        className={title.replace(" ", "")}
                        title={title}
                        subtitle={`Images For ${title}`}
                        handleChange={getSelectedFiles}
                      />{" "}
                    </Box>
                  ) : (
                    <Box key={boxKey} p="1rem">
                                <StandardBox
                        className={title}
                        key={title}
                        title={title}
                        subtitle={`${title}`}
                        getComment={getComments}
                      />
                    </Box>
                  );
                })}
              <Box
              sx={{
                paddingX: "5.5rem",
              }}
            >
              <SubmitBox handleSubmission={handleGeneric} />
            </Box>
      </Box>
      </Box>
  );
};

export default FormPage;
