import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Sidebar from "../global/Sidebar";
import axios from "axios";
import { useEffect } from "react";




const BASE_URL = process.env.REACT_APP_BASE_URL;


const Submissions = () => {
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
  const columns = [
    { field: "id", headerName: "ID"},
      { field: "Address", headerName: "Address" },

    {
      field: "Agent Name",
      headerName: "Agent Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    { field: "Contact Email", headerName: "Contact Email", flex: 1 },
    { field: "Team Member", headerName: "Team Member", flex: 1 },
    {
      field: "Agent Comments",
      headerName: "Agent Comments",
      flex: 1
    },
      { field: "Additional Comments", headerName: "Additional Comments", flex: 1 },
      { field: "Photo Location", headerName: "Photo Location", flex: 1 },
      { field: "PDF Location", headerName: "PDF Location", flex: 1 },
    ];
    const [data, setData] = useState([]);

    const handleChange = (newData) => {
        setData(newData)
    }
    
    
    useEffect(() => {
        async function fetchData() {
            
            try {
                const response = await axios.get(
                  `${BASE_URL}submissions/`
                );
                const newData = await response.data.message
                handleChange(newData[0])
              } catch (error) {
                console.error(error);
              }
        }
        fetchData()
    }, [])
    
    
  return (
    <Box display="flex" width="100%" height="100%">
      <Sidebar />
      <Box width="inherit" sx={{backgroundColor: colors.greenAccent[800]}}>
        <Box mx="20px" mt="1rem" >
          <Header
            title="Recent Submissions"
            subtitle="List of most recent submissions"
          ></Header>
          <Box
            height="90vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                  
              },
              "& .name-column--cell": {
                color: colors.grey[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.primary[900],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.greenAccent[900],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.primary[900],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
                      <DataGrid
                          sx={{
                              fontSize: "1.2rem"
                          }}
              checkboxSelection
              columns={columns}
                          rows={data}
                          
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Submissions;
