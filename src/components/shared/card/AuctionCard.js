import React from "react";
//mui
import { Box, Grid, Typography, AvatarGroup, Avatar } from "@mui/material";
// shared
import { Image } from "../../../components";
import { PriceSection, CustomAvatarGroup } from "../../../components/shared";
import LikesSection from "../LikesSection";
import { converter } from "../../../utils/ethConverter";
import NextLink from "next/link";
import Routes from "src/routes";

export default function AuctionCard({ img, name, time, price, likes, nftId, isAdmin }) {
  const [ethPrice, setEthPrice] = React.useState("");

  const [auctionLikes, setAuctionLikes] = React.useState([]);
  React.useEffect(() => {
    if (likes?.length > 0) {
      setAuctionLikes(likes);
    }
  }, [likes]);

  React.useEffect(async () => {
    if (price) {
      const value = price?.toString();
      const etherValue = converter(value, "wei", "eth");
      setEthPrice(etherValue);
    } else {
      setEthPrice("");
    }
  }, [price]);

  const sectionStyle = {
    backgroundImage: `url(${img})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "410px",
    borderRadius: "20px",
  };
  return (
    <Box className="box cursor">
      <NextLink href={`${Routes.nfts}/${nftId}`}>
        <a style={{ textDecoration: "none", color: "inherit" }}>

          <Box padding={3}>
            <Grid
              style={sectionStyle}
              container
              display="flex"
              direction={"column"}
              justifyContent="space-between"
              cursor={"pointer"}
            >
              <Grid item pl={4} pt={1} display="flex" justifyContent="flex-start">
                {/* <CustomAvatarGroup /> */}
              </Grid>
              <Grid item display="flex" justifyContent="center" height="100px">
                <Box
                  className="timer-box"
                  display="flex"
                  alignItems={"center"}
                  px={2}
                >
                  <Grid
                    container
                    display={"flex"}
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <Typography variant="subtitle1">Time Left</Typography>
                    </Grid>
                    <Grid item>
                      <Box width="13px" height="18px">
                        <Image src="/assets/images/svgs/fireIcon.svg" />
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box>
                        <Typography variant="h4">{time}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </a>
      </NextLink>
      <Box px={1} pl={2} pr={3} pb={2}>
        <Grid container spacing={0}>
          <Grid item xs={7}>
            <Typography pl={2} variant="h5">
              {name}
            </Typography>
            {isAdmin ? null : (
               <LikesSection
               pl={1}
               src="/assets/images/svgs/heart.svg"
               nftLikes={auctionLikes.length > 0 ? auctionLikes : []}
               nftId={nftId}
             />

            ) }
           
          </Grid>
          <Grid
            item
            xs={5}
            display="flex"
            justifyContent={"flex-end"}
            alignItems="center"
            height={"100%"}
          >
            <PriceSection
              src="/assets/images/svgs/fireIcon.svg"
              text={ethPrice}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
