import React from 'react';
import { FilledInput, InputAdornment, Button, Box } from '@mui/material';

export default function CustomEmail() {
  return (
    <Box>
      <FilledInput
        placeholder="Enter your Email"
        endAdornment={
          <InputAdornment position="end">
            <Button
              variant="containedInherit"
              size="large"
              sx={{ borderRadius: '0px 10px 10px 0px', px: 4, height: '40px' }}
            >
              Email Me!
            </Button>
          </InputAdornment>
        }
        sx={{
          pr: 0,
          '& .MuiFilledInput-input': { py: '14px' },
          background: 'black',
          borderRadius: 1.5,
          //minWidth: '400px',
          height: '40px',
          width: '100%',
        }}
      />
    </Box>
  );
}
