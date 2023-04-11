
import { Box } from '@mui/system';
import { Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Image } from '../../components';
import Routes from 'src/routes';
import NextLink from 'next/link';
import CircularProgress from "@mui/material/CircularProgress";


function CategoriesCard({ src, text , loading, linkKey}) {
    const theme = useTheme();

    return (
        <NextLink  href={`${Routes.collectionCategory}/${linkKey}`} key={linkKey}>
             <a style={{textDecoration: "none", color:"inherit"}}>
            
        <Card className="categories-card">
            <Box sx={{ borderRadius: 1.5, width: 304, height: 340, justifyContent: 'center' }}>
                {loading? (<CircularProgress/>) : (
                     <Image
                     alt="cover"
                     // src="/assets/images/svgs/art1.svg"
                     src={src}
                     sx={{
                         borderRadius: 1.5,
                         cursor: 'pointer',
                         width: '304px',
                         height: '251px',
                         marginTop: '15px'
 
                     }}
                 />

                )}
               
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h5" sx={{ color: theme.palette.brandblack.primary, marginTop: 3 }}>
                        {text}
                    </Typography>
                </Box>
            </Box>
            


        </Card>
        </a>
        </NextLink>
    )
}

export default CategoriesCard;




