

import React, { useState } from 'react';
import { Box, Typography,Avatar } from '@mui/material';
import { AvatarTypo } from '../../shared';
import moment from "moment";

export default function AvatarActivity({src, date, activity}) {
  return (
    <Box>
      <Box alignItems="center" maxWidth="855px" height="auto" px="4px" sx={{display: 'flex', flexDirection: 'row'}}>

          <Avatar alt="avatar" src={src}
          sx={{maxWidth: '66px', maxHeight:'66px'}}
          />

          <Box sx={{display: 'flex', flexDirection: 'column', pl:2}}>
          <Typography variant="body5" sx={{fontSize:{xs:'16px' ,sm:'22px'}, opacity: '.7', pt:{xs:2, sm:0}}}>
           {date && moment(date).local().format("DD/MM/YYYY, hh:mm a")}
        </Typography>

        <Typography variant="h4" sx={{maxWidth:'615px'}}>
            {activity}
           
        </Typography>

          </Box>

       
      </Box>
     
    </Box>
  );
}
