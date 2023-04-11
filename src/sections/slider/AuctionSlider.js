import React from "react";
// mui
import { Grid, Container, Box } from "@mui/material";

// slider
import Slider from "react-slick";

import moment from "moment";
import { Image } from "../../components";
import "moment-duration-format";
// common
import {
  CardHeading,
  AuctionCard,
  PriceSection,
} from "../../components/shared";

// import NextLink from "next/link";
// import Routes from "src/routes";

import { GetTimedAuctionNft } from "../../apis";
import CountDown from "../../components/shared/CountDown";

export default function AuctionSlider() {
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
  };

  const [auctionData, setAuctionData] = React.useState([]);
  const [data, setData] = React.useState(false);

  const getAuctionNftsData = async () => {
    const payload = {
      limit: "5",
      skip: "0",
      video: false,
    };
    const result = await GetTimedAuctionNft();

    if (result?.data?.data) {
      setAuctionData(result?.data?.data);
      setData(true);
    }

    if (!result) {
      return;
    }
  };

  // console.log("auctionData...",auctionData )

  React.useEffect(() => {
    getAuctionNftsData();
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1300px",
        pt: "150px",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              width: "100%",
              height: "auto",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              marginBottom: "59px !important",
              padding: {
                md: "0px 20px",
                lg: "0px 40px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "auto",
                gap: "10px",
              }}
            >
              <CardHeading text="Live Auctions"></CardHeading>

              <Image
                sx={{ width: "32px", height: "40px" }}
                component="img"
                alt="fire"
                src="/assets/images/svgs/bigFire.svg"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {auctionData.length > 2 ? (
            <Box>
              <Slider {...settings}>
                {auctionData &&
                  auctionData.length > 2 &&
                  auctionData.map((value, index) => {
                    let nft = value?.nft_owners[value?.nft_owners?.length - 1];
                    let nftLikes = value?.likes;
                    // Time
                    let start_time = value?.start_date;
                    let end_time = nft?.end_date;
                    // let end = moment(end_time).fromNow();

                    let nowTime = moment.utc().format();
                    const new_end_time = moment(end_time); // in moment time format
                    let nowTime_local = moment.utc(nowTime).local().format();
                    let secondsDiff = new_end_time.diff(
                      nowTime_local,
                      "miliseconds"
                    );
                    // console.log('miliseconds', secondsDiff)
                    // let linkKey = value?._id;

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
        </Grid>
      </Grid>
    </Container>
  );
}
