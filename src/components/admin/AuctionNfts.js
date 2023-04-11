import React from 'react'
// mui
import { Grid, Container, Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { converter } from '../../utils/adminEthConvertor'
// slider
import Slider from 'react-slick'
import NextLink from 'next/link';
import { getUserCookie } from '../../utils/getCookies'

import moment from 'moment'
import { Image } from '../../components'
import 'moment-duration-format'
// common
import { CardHeading, AuctionCard, PriceSection } from '../../components/shared'
import { LiveAuctions } from '../../apis';


// import NextLink from "next/link";
// import Routes from "src/routes";

// import { GetTimedAuctionNft } from "../../apis";
import CountDown from '../../components/shared/CountDown'

export default function AuctionNfts() {
  const [auction, setAuction] = React.useState([])
  const theme = useTheme()
  const token = getUserCookie()

  const nftdata = async () => {
    const result = await LiveAuctions()
    if (result?.data?.data) {
      setAuction(result?.data?.data)
    }
    return result
  }

  React.useEffect(async () => {
    if (token) {
      const data = await nftdata()
    }
  }, [token])

  console.log('auction...', auction);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,

    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Grid container>
      <Grid item xs={12}>
   

        <Box
          mb={2}
          sx={{
            width: 'auto',
            height: 'auto',
            display: 'flex',
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'space-between',
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

          <NextLink  href={`/admin/auctions`}>
            <a style={{ color: theme.palette.brandpurple.primary }}>
              <Typography variant="h5">View All</Typography>
            </a>
          </NextLink>
        </Box>
      </Grid>
      <Grid item xs={12}>

      {auction.length > 2 ? (
            <Box>
              <Slider {...settings}>
                {auction &&
                  auction.length > 2 &&
                  auction.map((value, index) => {
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
                    );
                  })}
              </Slider>
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <Image
                alt="cover"
                src="/assets/images/svgs/noData.svg"
                sx={{
                  width: "270px",
                  height: "auto",
                }}
              />
            </Box>
          )}


        {/* <Box>
          <Slider {...settings}>
            <AuctionCard
              isAdmin
              img={'/assets/images/svgs/nft2.svg'}
              price={250000000000000000}
              time={<CountDown time={'1222133'} />}
              name={'Wonder Boy'.slice(0, 15) + '...'}
            />

            <AuctionCard
              isAdmin
              img={'/assets/images/svgs/nft1.svg'}
              price={250000000000000000}
              time={<CountDown time={'1222133'} />}
              name={'Wonder Boy'.slice(0, 15) + '...'}
            />

            <AuctionCard
              isAdmin
              img={'/assets/images/svgs/nft3.svg'}
              price={250000000000000000}
              time={<CountDown time={'1222133'} />}
              name={'Wonder Boy'.slice(0, 15) + '...'}
            />

            <AuctionCard
              isAdmin
              img={'/assets/images/svgs/nft4.svg'}
              price={250000000000000000}
              time={<CountDown time={'1222133'} />}
              name={'Wonder Boy'.slice(0, 15) + '...'}
            />
          </Slider>
        </Box> */}
      </Grid>
    </Grid>
  )
}
