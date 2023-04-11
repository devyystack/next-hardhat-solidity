import React from 'react'
// mui
import { Grid, Container, Box, Typography, Paper, Avatar } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {TopCreatorsData} from "../../apis";
import { useAppContext } from "src/context-api/appContext";

// slider
import Slider from 'react-slick'
import NextLink from 'next/link'

import moment from 'moment'
import { Image } from '../../components'
import 'moment-duration-format'
// common
import { CardHeading, AuctionCard, PriceSection } from '../../components/shared'

// import NextLink from "next/link";
// import Routes from "src/routes";

// import { GetTimedAuctionNft } from "../../apis";
import { getUserCookie } from "../../utils/getCookies";

export default function TopCreators() {
  const { state , dispatch} = useAppContext();

    const [topCreators, setTopCreators] = React.useState([]);
    const theme = useTheme();
    const token = getUserCookie();
  
  
    const nftdata = async () => {
      const result = await TopCreatorsData();
      if(result?.data?.data){
        setTopCreators(result?.data?.data);
      }
      return result;
    
    }
  
    React.useEffect(async() =>{
      const data = await nftdata();
  
    },[token])
  
  


  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          width: '1300px',
          minHeight: '376px',
          height: 'auto',
        },
      }}
    >
      <Paper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>

            <Box
              px={4}
              py={4}
              sx={{
                width: 'auto',
                height: 'auto',
                display: 'flex',
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <CardHeading text="Top Creators" />

              {/* <Box>
              <NextLink href="#"  >
                <a style={{ color: theme.palette.brandpurple.primary }} >
                  <Typography variant="h5">View All</Typography>
                </a>
              </NextLink>

              </Box> */}
            
            </Box>
          </Grid>

          <Grid spacing={2} item xs={12}>
            <Box display="flex" flexDirection="row">

                {topCreators.length > 0 ? (

                    topCreators?.map((value, index)=> {
                        return(

                            <Box
                            key={index}
                            minWidth="141px"
                            width="auto"
                            px={4}
                            py={2}
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                           
                            }}
                          >
                            <Box display="flex" alignItems="center" flexDirection="column">
                              <Avatar
                                variant="rounded"
                                src={  process.env.NEXT_PUBLIC_PINATA_BASE_URL + value?.profileImage}
                                alt="avatar"
                                sx={{
                                  width: '141px',
                                  height: '141px',
                                  borderRadius: '50%',
                                }}
                              />
            
                              <Box display="flex">
                                <Typography noWrap variant="h6">
                                  {value?.userName}
                                </Typography>
                              </Box>
            
                              <Box display="flex">
                                <Typography noWrap variant="subtitle4">
                                  {'@'+value?.userName.replace(/\s/g, '')}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                        )
                    })
                ) : (

                     <Box display="flex" justifyContent="center" width="100%">
                     <Image
                       alt="cover"
                       src="/assets/images/svgs/noData.svg"
                       sx={{
                         mt: 4,
                         width: '270px',
                         height: 'auto',
                       }}
                     />
                   </Box>

                )}

           

              
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
