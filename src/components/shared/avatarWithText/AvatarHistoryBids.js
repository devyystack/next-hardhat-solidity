import React from "react";

// mui
import { Box, Typography, Avatar, Link } from "@mui/material";

// other
import subString from "../../../utils/subString";
import moment from "moment";
import NextLink from "next/link";
import { Image } from "../../../components";
import { getUserCookie } from "../../../utils/getCookies";
import { toast } from "react-toastify";

export default function AvatarHistoryBids({
  src,
  title,
  price,
  currencyType,
  ownerName,
  bodyText,
  time,
  opacity,
  slice,
  bid,
  index,
  link,
  hash,
}) {
  const handleLogin = () => {
    const token = getUserCookie();
    if (!token || token === "undefined" || token === undefined) {
      if (link.includes("/profile")) {
        toast.error("Sign in please.", { autoClose: 1500 });
      }
    }
  };
  return (
    <Box display={"flex"} alignItems="center">
      <NextLink href={link ? link : "#"} underline="none" color="inherit">
        <a
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={() => handleLogin()}
        >
          <Avatar
            src={src}
            alt="avatar"
            sx={{ width: "57px", height: "57px" }}
          />
        </a>
      </NextLink>
      <Box>
        <Box display="flex">
          {title && (
            <Typography
              variant="subtitle1"
              ml="10px"
              sx={{ opacity: opacity ? ".7" : "1" }}
            >
              {title}
            </Typography>
          )}
          <Typography variant="subtitle1" ml="10px">
            {index < 1
              ? "Created "
              : bid
              ? price && price + " " + currencyType
              : ""}
            {index > 0 && !bid && "Purchased"}
            {" by " + ownerName}
          </Typography>
          {hash !== "" ? (
            <Box
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              marginLeft="5px"
              sx={{ cursor: "pointer" }}
            >
              <a
                target="_blank"
                href={process.env.NEXT_PUBLIC_ETHER_SCAN + hash}
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/images/svgs/websiteIcon.svg"
                  sx={{ width: "10px" }}
                />
              </a>
            </Box>
          ) : (
            <Box
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            marginLeft="5px"
            sx={{ cursor: "pointer" }}
          >
           
              <Image
                src="/assets/images/svgs/websiteIcon.svg"
                sx={{ width: "10px" }}
              />
          </Box>

          )}
        </Box>
        <Box display="flex">
          {bodyText && (
            <Typography
              variant="body1"
              ml="10px"
              sx={{ opacity: opacity ? ".7" : "1" }}
            >
              {slice ? subString(bodyText) : bodyText}
            </Typography>
          )}
          <Typography
            variant="body1"
            ml="10px"
            sx={{ opacity: bid ? ".7" : "1" }}
          >
            {time && moment(time).local().format("DD/MM/YYYY, hh:mm a")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
