import { Button } from '@mui/material';
import Image from '../Image';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useTheme } from '@mui/material/styles';
import NextLink from "next/link";

export default function SocialGroup({ directIcon, instaIcon, twitterIcon, webLink, instaLink, twitterLink }) {
  const theme = useTheme();
  return (
    <ButtonGroup>
      {webLink && (
        <NextLink href={webLink}>
         <Button
         sx={{
           borderColor: theme.palette.grey[450],
           '&:hover': {
             borderColor: theme.palette.grey[450],
             backgroundColor: 'transparent',
             boxShadow: theme.customShadows.stage,
           },
         }}
       >
         <Image
           alt="social"
           src={directIcon}
           sx={{ width: { xs: '18px', sm: '25px' }, height: { xs: '18px', sm: '25px' } }}
         />
       </Button>
       </NextLink>

      )}

      {instaLink && (
         <NextLink href={instaLink}>
         <Button
         sx={{
           border: '1px solid',
           borderColor: theme.palette.grey[450],
           '&:hover': {
             borderColor: theme.palette.grey[450],
             backgroundColor: 'transparent',
             boxShadow: theme.customShadows.stage,
           },
         }}
       >
         <Image
           alt="social"
           src={instaIcon}
           sx={{ width: { xs: '18px', sm: '25px' }, height: { xs: '18px', sm: '25px' } }}
         />
       </Button>
       </NextLink>

      )}
     
     {twitterLink && (
       <NextLink href={twitterLink}>
         <Button
         sx={{
           border: '1px solid',
           borderColor: theme.palette.grey[450],
           '&:hover': {
             borderColor: theme.palette.grey[450],
             backgroundColor: 'transparent',
             boxShadow: theme.customShadows.stage,
           },
         }}
       >
         <Image
           alt="social"
           src={twitterIcon}
           sx={{ width: { xs: '18px', sm: '25px' }, height: { xs: '18px', sm: '25px' } }}
         />
       </Button>
       </NextLink>

     )}
    
    </ButtonGroup>
  );
}
