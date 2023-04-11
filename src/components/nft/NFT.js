import React, { useEffect, useState } from "react";

// next
import NextLink from "next/link";

// routes
import Routes from "src/routes";
// mui
import { Card, Box, Typography, Tooltip } from "@mui/material";
import { Image } from "../../components";
import { LikesSection, PriceSection } from "../shared";
import OnSale from "../shared/OnSale";
import "/node_modules/video-react/dist/video-react.css";
import { toFixedNumber } from "../../utils/formatNumber";
import { Player } from "video-react";
import { getBidsByNftId } from "../../apis";
import { STAGE_BID_PERCENTAGE } from "../../config";
import { converter } from "../../utils/ethConverter";
import { percentage } from "../../utils/percentageCalc";
import Countdown from "react-countdown";
import moment from "moment";
import "moment-duration-format";
export default function NFT({
  src,
  likes,
  name,
  price,
  linkKey,
  nftId,
  imageType,
  saleType,
  bidsCount,
  ownerAddress,
  endTime,
  putOnSale,
}) {
  const [ethPrice, setEthPrice] = useState("");
  const [nftLikes, setNftLikes] = useState([]);
  const [bids, setBids] = useState(null);
  const [bidPrice, setBidPrice] = useState("");
  const [countTime, setCountTime] = useState("");

  useEffect(() => {
    if (likes?.length > 0) {
      setNftLikes(likes);
    }
  }, [likes]);

  useEffect(async () => {
    if (price) {
      const value = price?.toString();
      const etherValue = converter(value, "wei", "eth");
      setEthPrice(etherValue);
    } else {
      setEthPrice("");
    }
  }, [price]);
  useEffect(async () => {
    if (bidsCount > 0) {
      const result = await getBidsByNftId(nftId, ownerAddress);
      setBids(result?.data?.data);
    }
  }, [bidsCount]);

  useEffect(() => {
    if (endTime) {
      let nowTime = moment.utc().format();
      const endTimeInMoment = moment(endTime); // in moment time format
      let nowTimeLocal = moment.utc(nowTime).local().format();
      let secondsDiff = endTimeInMoment.diff(nowTimeLocal, "miliseconds");
      setCountTime(secondsDiff);
    }
  }, [endTime]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (bids) {
        let etherPrice =
          bids.length > 0 &&
          toFixedNumber(
            converter(
              bids.length > 0 && bids.length === 1
                ? bids[0]?.bid_price +
                    percentage(STAGE_BID_PERCENTAGE, bids[0]?.bid_price)
                : bids.length > 0 && bids[bids.length - 1]
                ? bids[bids.length - 1]?.bid_price +
                  percentage(
                    STAGE_BID_PERCENTAGE,
                    bids[bids.length - 1]?.bid_price
                  )
                : ownerData?.nft_price,
              "wei",
              "eth"
            ),
            4
          );
        setBidPrice(etherPrice);
      }
    }
  }, [bids]);

  return (
    <Card className="nft-card">
      <Box className="nft-image">
        <NextLink href={`${Routes.nfts}/${linkKey}`} key={linkKey}>
          <a>
            {imageType === "video" ? (
              <Player
                playsInline
                src={src}
                fluid={false}
                display="flex"
                alignItems="center"
                width={250}
                height={230}
              />
            ) : (
              <Image src={src} />
            )}
          </a>
        </NextLink>
      </Box>
      <Box className="nft-footer">
        <Box>
          <Typography noWrap variant="h5">
            {name}
          </Typography>
        </Box>
        <Box display="flex" justifyContent={"space-between"}>
          <Box display={"flex"} justifyContent="center" alignItems={"center"}>
            <OnSale
              text="On Sale"
              textStyle={ethPrice ? false : true}
              nft={true}
            />
          </Box>
          <Box>
            <LikesSection
              src="/assets/images/svgs/heart.svg"
              nftLikes={nftLikes.length > 0 ? nftLikes : []}
              nftId={nftId}
            />
          </Box>
        </Box>
        <Box
          sx={{
            minHeight: "60px",
            backgroundColor: "#f1eaff",
            borderRadius: "10px",
            padding: "10px",
          }}
          display="flex"
          justifyContent={"space-between"}
        >
          <Box
            display="flex"
            flexDirection={"column"}
            // justifyContent={ethPrice ? "space-between" : "flex-end"}
          >
            <span style={{ fontSize: "12px" }}>
              {saleType === "price" ? "Price" : "Minimum Bid"}
            </span>
            {/* Minimum Bid */}
            <span
              style={{ fontSize: "12px", fontWeight: "bold", color: "#692ADC" }}
            >
              <Tooltip title={ethPrice ? ethPrice : ""} placement="top">
                <span>
                  {bidsCount > 0 ? bidPrice : toFixedNumber(ethPrice, 4)}
                  {" ETH"}
                </span>
              </Tooltip>
            </span>
            {/* <span>{ethPrice && <PriceSection text={ethPrice} />}</span> */}
          </Box>
          {saleType === "time" && putOnSale && (
            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent="flex-end"
              alignItems={"flex-end"}
            >
              <span style={{ fontSize: "12px" }}>Time Left</span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#692ADC",
                }}
              >
                <Countdown date={Date.now() + countTime}>
                  <span>Bidding Closed!</span>
                </Countdown>
              </span>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
}
{
  /* <Card className="nft-card">
<Box
  className="cursor"
  height={267}
  mb={2}
  sx={{ borderRadius: 1, overflow: "hidden" }}
  display="flex"
  justifyContent="center"
  alignItems="center"
>
  <NextLink href={`${Routes.nfts}/${linkKey}`} key={linkKey}>
    <a>
      {imageType === "video" ? (
        <Player
          playsInline
          src={src}
          fluid={false}
          display="flex"
          alignItems="center"
          width={250}
          height={200}
        />
      ) : (
        <Image
          src={src}
          sx={{
            borderRadius: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        />
      )}
    </a>
  </NextLink>
</Box>
<Box display="flex" justifyContent={"space-between"}>
  <Box mt={3}>
    <Typography
      noWrap
      variant="h5"
      sx={{
        maxWidth: { xs: "150px", sm: "196px", md: "146px", lg: "196px" },
      }}
    >
      {name}
    </Typography>
  </Box>
  <Box mt={3}>
    <OnSale
      text="On Sale"
      textStyle={ethPrice ? false : true}
      nft={true}
    />
  </Box>
</Box>

<Box
  display="flex"
  justifyContent={ethPrice ? "space-between" : "flex-end"}
>
  {ethPrice && <PriceSection text={ethPrice} />}
  <LikesSection
    src="/assets/images/svgs/heart.svg"
    nftLikes={nftLikes.length > 0 ? nftLikes : []}
    nftId={nftId}
  />
</Box>
</Card> */
}
