import React from 'react';
import { Box, useTheme } from '@mui/material';

import { tokens } from '../../theme';
import Topbar from '../global/Topbar';

function FormPage() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  

    return (

            
                <Topbar/>

    
    );
}

export default FormPage;