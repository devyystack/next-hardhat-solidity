import React from 'react';
// mui

import { Tooltip, Box, Button } from '@mui/material';
import { Image } from '../';

export default function CustomInfoIcon({ text, src }) {
  return (
    <Box>
      <Tooltip title={text ? text : 'info'} arrow placement="top">
        <span>
          <Image src={src} sx={{ maxWidth: '20px' }} />
        </span>
      </Tooltip>
    </Box>
  );
}
