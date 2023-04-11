

import React from 'react';
// mui
import { Button, Box, IconButton } from '@mui/material';
import {Image} from "../../";

export default function TrandingNft({ text, alt, src, isIcon, onClick }) {
  return (
    <Box>
      <Button onClick={onClick} variant="" className="gradient-button">
        {isIcon && (
           <Box  className="blue-icon" mr={1}>
         
             <Image alt={alt} src={src} sx={{ width: '15px', height: '15px' }} />
          
         </Box>
         )} 
       
        {text}
      </Button>
    </Box>
  );
}
