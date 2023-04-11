import React from 'react';

//mui
import { Grid, Typography, Box } from '@mui/material';
import { Image } from '../../';
import { ToggleButton } from '../../shared';

export default function UnblockContent({ handleChange, checked }) {
  return (
    <Grid container>
      <Grid item xs={12} sm={2} md={1}>
        <Image src="/assets/images/svgs/unblockicon.svg" sx={{ width: '40px', pt: 1 }} />
      </Grid>
      <Grid item xs={11} sm={9} md={10}>
        <Typography variant="h4">Unlockable Content</Typography>
        <Box display="flex">
          <Typography variant="body1">Content is only visible for NFT Owner</Typography>
        </Box>
      </Grid>
      <Grid item xs={1} sm={1} md={1}>
        <ToggleButton status={checked} handleChange={handleChange} />
      </Grid>
    </Grid>
  );
}
