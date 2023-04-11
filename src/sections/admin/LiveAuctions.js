

import React, { useEffect } from "react";
//mui
import { Box, Grid, Container, Typography, Button, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import CircularProgress from "@mui/material/CircularProgress";
import { Image } from "../../components";
import { CardHeading, AuctionCard, PriceSection } from '../../components/shared'

import NextLink from 'next/link'
import { getUserCookie } from '../../utils/getCookies'

import moment from 'moment'
import 'moment-duration-format';

import { queryParamFormatter } from "../../utils/queryStringFormetter";

// common

import { AdminNft } from "src/components/nft";
// routes
import Routes from "src/routes";
import { AuctionList } from "../../apis";
import { useAppContext } from "../../context-api/appContext";
import { converter } from "../../utils/ethConverter";
import CountDown from '../../components/shared/CountDown'

function LiveAuctions() {
    const [btnLabel, setBtnLabel] = React.useState("Load More");

  const [skip, setSkip] = React.useState(0);
  const { dispatch, state } = useAppContext();

    const [auction, setAuction] = React.useState([])
    const theme = useTheme()
    const token = getUserCookie()
  
    const nftdata = async () => {
        const payload = {
            skip: "0",
        };
      const result = await AuctionList(queryParamFormatter(payload));
      if (result?.data?.data) {
        setAuction(result?.data?.data)
      }
      return result;
    }

    const handleMore = async () => {
        const payload = {
            skip: "0",
        };
        Object.assign(payload, { skip: skip + 12 });
    
        const result = await AuctionList(queryParamFormatter(payload));
    
        if (result?.data?.data) {
          let oldArray = [];
          let newArray = result?.data?.data;
          let finalArray = [...oldArray, ...newArray];
          dispatch({ type: "PROFILE_NFTS", value: finalArray });
          if (result?.data?.data.length === 0) {
            setBtnLabel("No More Data ...");
            return;
          }
         
          setSkip(skip + 12);
        }
      };
  
    React.useEffect(async () => {
      if (token) {
        setSkip(0);
        const data = await nftdata();
      }
    }, [token])
  
    console.log('auction list...', auction);



  return (
    <Container
      maxWidth={false}
      sx={{
        boxShadow: (theme) => ({
          xs: 0,
        }),
        maxWidth: "1300px",
        pt: "140px",
      }}
    >
      <Box width={'auto'} sx={{ display: 'flex', flexDirection: 'row' }}>
            <CardHeading text="Live Auctions" />

            <Box pl={2}>
              <Image
                sx={{ width: '29px', height: '39px' }}
                component="img"
                alt="fire"
                src="/assets/images/svgs/bigFire.svg"
              />
            </Box>
          </Box>


      <Grid container spacing={5} mt={2}>
        {
            auction.length > 0 ?  (
            auction?.map((value, index) => {
                let nft = value?.nft_owners[value?.nft_owners?.length - 1];
                let nftLikes = value?.likes;
                // Time
           
                let end_time = nft?.end_date;

                let nowTime = moment.utc().format();
                const new_end_time = moment(end_time); // in moment time format
                let nowTime_local = moment.utc(nowTime).local().format();
                let secondsDiff = new_end_time.diff(
                  nowTime_local,
                  "miliseconds"
                );
           
            return (
              <Grid item xs={12} md={4} key={index}>
                 <AuctionCard
                        key={index}
                        nftId={value?._id}
                        likes={nftLikes}
                        img={
                          process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                          value?.profile_image
                        }
                        price={nft?.nft_price}
                        time={<CountDown time={secondsDiff} />}
                        name={
                          value?.nft_name.length > 15
                            ? value?.nft_name.slice(0, 15) + "..."
                            : value?.nft_name
                        }
                      />
              </Grid>
            );
          })
        ) : (
          <Box display="flex" justifyContent="center" width="100%">
            <Image
              alt="cover"
              src="/assets/images/svgs/noData.svg"
              sx={{
                width: "270px",
                height: "auto",
                mt: 6,
              }}
            />
          </Box>
        )}
      </Grid>

    
        <Box
          py={1}
          mt={10}
          display="flex"
          textAlign={"center"}
          justifyContent="center"
        >
          <Typography
            variant="h4"
            sx={{ color: theme.palette.brandpurple.primary }}
          >
            {btnLabel !== "Load More" ||
            auction.length < 12 ? null : (
              <Link
                onClick={handleMore}
                underline="always"
                color="inherit"
                sx={{ color: theme.palette.brandpurple.primary }}
              >
                {btnLabel}
              </Link>
            )}
          </Typography>
        </Box>
    
    </Container>
  );
}

export default LiveAuctions;
