import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (

      <Box width="inherit" >
      <Box m="20px" >
        <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
        <Accordion defaultExpanded sx={{backgroundColor: colors.primary[900]}}>
          <AccordionSummary  expandIcon={<ExpandMoreIcon />} >
            <Typography color={colors.greenAccent[500]} variant="h5">
              An Important question
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
              corporis in blanditiis, corrupti quidem, sint quia saepe
              perspiciatis velit similique tempore voluptate vel mollitia. Ipsum
              dolorem numquam aperiam sunt placeat.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded sx={{backgroundColor: colors.primary[900]}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              Another Question
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
              corporis in blanditiis, corrupti quidem, sint quia saepe
              perspiciatis velit similique tempore voluptate vel mollitia. Ipsum
              dolorem numquam aperiam sunt placeat.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded sx={{backgroundColor: colors.primary[900]}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              My First Question
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
              corporis in blanditiis, corrupti quidem, sint quia saepe
              perspiciatis velit similique tempore voluptate vel mollitia. Ipsum
              dolorem numquam aperiam sunt placeat.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded sx={{backgroundColor: colors.primary[900]}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              A Random Question
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
              corporis in blanditiis, corrupti quidem, sint quia saepe
              perspiciatis velit similique tempore voluptate vel mollitia. Ipsum
              dolorem numquam aperiam sunt placeat.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded sx={{backgroundColor: colors.primary[900]}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              Last Question
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
              corporis in blanditiis, corrupti quidem, sint quia saepe
              perspiciatis velit similique tempore voluptate vel mollitia. Ipsum
              dolorem numquam aperiam sunt placeat.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};
export default FAQ;
