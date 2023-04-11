// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Stack } from '@mui/material';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
import { Image } from "../src/components";


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(15, 2.5),
  [theme.breakpoints.up('sm')]: {
    height: '60vh',
  },
}));

// ----------------------------------------------------------------------

export default function ContactUs() {
  return (
    <Page title="Contact Us | DStage - NFT Marketplace">
      <RootStyle>
        <Stack alignItems="center" sx={{ maxWidth: 480, mt:10 }}>
          <Typography variant="h3" paragraph>
          Contact us and we’ll get back to you as soon as we can.
          
          </Typography>
        
         
          <Typography sx={{ color: 'text.secondary' }}>
               
          We'd love to hear from you.
          </Typography>
         
            <Button size="large" variant="contained" sx={{mt:1, backgroundColor: '#5865F2'}}>
                <Image sx={{marginRight: 1}}  alt="discord" src="/assets/images/svgs/discordIcon2.svg"/>
              Discord
            </Button>
        
        </Stack>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ContactUs.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
