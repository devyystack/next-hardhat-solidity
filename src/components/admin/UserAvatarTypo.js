
import React from "react";

// mui
import { Box, Typography, Avatar, Link } from "@mui/material";

// other
import subString from "../../utils/subString";
import moment from "moment";
import NextLink from "next/link";
import { Image } from "../../components";
import Routes from "src/routes";



export default function UserAvatarTypo({
  src,
  title,
  ownedBy,
  address,
  isOwned,


}) {

  return (
    <Box display={"flex"} alignItems="center">
      {/* <NextLink href={link ? link : "#"} underline="none" color="inherit"> */}
      <NextLink href={address!==null ?  `${Routes.consumerProfile}/${address}` : "#"}
      
       >
        <a style={{textDecoration: "none"}}> 

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
              noWrap
              variant="subtitle1"
              width="180px"
              ml="10px"
              sx={{ opacity: "1" }}
            >
              {title}
            </Typography>
          )}


        </Box>
        {isOwned && (
          <Box display="flex" width="180px">
            <Typography
              noWrap
              variant="body1"
              ml="10px"
              sx={{ opacity: "0.7" }}
            >
              {ownedBy}
            </Typography>
          </Box>

        )}

      </Box>
    </Box>
  );
}
