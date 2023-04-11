import * as React from 'react'
import moment from 'moment'
import NextLink from 'next/link'
import Routes from 'src/routes'
import { Image } from '../../components'

import {TrendingNftData} from "../../apis";

import PriceSection from '../../components/shared/PriceSection'
import { converter } from '../../utils/adminEthConvertor'
import ReadMore from '../../utils/ReadMore'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { Box, Typography, Divider, Avatar, Link, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { AvatarDetailed } from '../shared'
import {
  CardHeadingGradient,
  TrandingNft,
  CardHeading,
} from '../../components/shared';

import { getUserCookie } from "../../utils/getCookies";


export default function TrendingNft() {
  const [trending, setTrending] = React.useState([]);
  const theme = useTheme();
  const token = getUserCookie();


  const nftdata = async () => {
    const result = await TrendingNftData();
    if(result?.data?.data){
      setTrending(result?.data?.data);
    }
    return result;
  
  }

  React.useEffect(async() =>{
    const data = await nftdata();

  },[token])


  let owners = trending?.[0]?.nft_owners?.[0];



  return (
    <Box width="100%">
      <Box
      mb={4}
        sx={{
       
         
          display: 'flex',
          overflow: 'hidden',
          alignItems: 'center',
        }}
      >
        <CardHeading text="Trending NFT" />

        <Image
          alt="trening"
          src="/assets/images/svgs/energy.svg"
          sx={{
            width: '30px',
            height: '34px',
            marginLeft: '8px',
          }}
        />
      </Box>
      
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            width: '799px',
            minHeight: '503px',
            height: 'auto'
          },
        }}
      >
        <Paper elevation={3}>
          <Grid container pl={2} pr={4} spacing={1} pb={4}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                width={'100%'}
                height={'100%'}
                display={'flex'}
                justifyContent={'center'}
                alignItems="center"
                pt={4}
              >
                <Box className="trending-home">
                  <Image
                    alt="trening"
                    src={process.env.NEXT_PUBLIC_PINATA_BASE_URL + trending?.[0]?.profile_image}
                    sx={{
                      width: '300px',
                      height: '403px',
                      borderRadius: 1,
                      cursor: 'pointer',
                      boxShadow: 1,
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                pl={2}
                pt={4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: 'auto',
                }}
              >
                <Typography variant="h4">{ trending?.[0]?.nft_name}</Typography>

                <Box mt={2}>
                  <Typography variant="subtitle1">Current Price</Typography>

                  <PriceSection
                    text={owners?.nft_price!==null ?  (converter(owners?.nft_price, 'wei', 'eth')) : 0}
                  />
                </Box>

                <Box mt={2} height={'auto'} mb={2}>
                  <Typography
                    noWrap
                    variant="body1"
                    sx={{
                      fontSize: '15px',
                      fontWeight: '700px',
                    }}
                  >
                   { trending?.[0]?.description}
                  </Typography>
                </Box>
              </Box>

              <Grid item xs={12}>
                <Divider sx={{ height: 'auto', mb: 2 }} />
              </Grid>

              <Box
                pl={2}
                sx={{ display: 'flex', flexDirection: 'row', mt: '16px' }}
              >
                <Grid item xs={12} sm={6}>
                  <AvatarDetailed
                    title="Creator"
                    src={process.env.NEXT_PUBLIC_PINATA_BASE_URL +  trending?.[0]?.nft_creator?.profileImage}
                    avatarText={ trending?.[0]?.nft_creator?.publicAddress}
                    isSlice={true}
                    isLight={true}
                    opacity={true}
                    link={`/profile/${ trending?.[0]?.nft_creator?.publicAddress}`}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <AvatarDetailed
                    title="Collections"
                    src={process.env.NEXT_PUBLIC_PINATA_BASE_URL + trending?.[0]?.collection?.profile_image}
                    avatarText={trending?.[0]?.collection?.collection_name}
                    isSlice={false}
                    isLight={true}
                    opacity={true}
            
                    link={`/collection-detail/${trending?.[0]?.collection?._id}`}
                  />
                </Grid>
              </Box>
              <Box pl={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid item xs={12}>
                  <Divider sx={{ height: 24, mb: 2 }} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <AvatarDetailed
                    title="Blockchain"
                    src="/assets/images/svgs/etherum-light.svg"
                    avatarText={trending?.[0]?.block_chain}
                    isLight={false}
                    opacity={false}
                    isColored={true}
                    link="#"
                  />
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  )
}
