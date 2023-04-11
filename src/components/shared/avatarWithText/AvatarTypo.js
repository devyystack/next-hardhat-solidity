import React from "react";
import { Box, Typography, Avatar, Link } from "@mui/material";
import subString from "src/utils/subString";
// @mui
import { useTheme } from "@mui/material/styles";
import NextLink from "next/link";
import { getUserCookie } from "../../../utils/getCookies";
import { toast } from "react-toastify";
export default function AvatarTypo({
  src,
  text,
  isLight,
  opacity,
  slice,
  isColored,
  isAdmin,
  link,
  isAdminProfile
}) {
  const theme = useTheme();
  const handleLogin = () => {
    const token = getUserCookie();
    if (!token || token === "undefined" || token === undefined) {
      if (link.includes("/profile")) {
        toast.error("Sign in please.", { autoClose: 1500 });
      }
    }
  };
  return isLight ? (
    <NextLink href={link ? link : "#"} underline="none" color="inherit">
      <a style={{ color: "inherit" }} onClick={() => handleLogin()}>
        <Box
          display={"flex"}
          alignItems="center"
          height="100%"
          sx={{ cursor: "pointer" }}
        >
          <Avatar src={src} alt="avatar" />
          <Typography
            variant="body1"
            ml="10px"
            sx={{ opacity: opacity ? ".7" : "1" }}
            noWrap
          >
            {slice ? subString(text) : text}
          </Typography>
        </Box>
      </a>
    </NextLink>
  ) : isColored ? (
    <NextLink href={link ? link : "#"}>
      <a
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => handleLogin()}
      >
        <Box
          display={"flex"}
          alignItems="center"
          height="100%"
          sx={{ cursor: "pointer" }}
        >
          <Avatar src={src} alt="avatar" />
          <Typography
            variant="h4"
            ml="10px"
            sx={{
              opacity: opacity ? ".7" : "1",
              color: isColored && theme.palette.brandblue.primary,
            }}
            noWrap
          >
            {slice ? subString(text) : text}
          </Typography>
        </Box>
      </a>
    </NextLink>
  ) : isAdmin ? (
    
        <Box
          display={"flex"}
          alignItems="center"
          sx={{ marginLeft: { xs: "16px" } }}
          height="100%"
        >
          <Avatar src={src} alt="avatar" />
          <Typography
            variant="h5"
            ml="10px"
            sx={{
              opacity: opacity ? ".7" : "1",
              color: theme.palette.brandblack.primary,
            }}
            noWrap
          >
            {text}
          </Typography>
        </Box>
  
  )
  : isAdminProfile ? (
    
    <Box
      display={"flex"}
      alignItems="center"
      sx={{ marginLeft: { xs: "16px" } }}
      height="100%"
    >
      <Avatar src={src} alt="avatar" sx={{
        width: '81px', height: '81px'

      }}/>
      <Typography
        variant="h4"
        ml="10px"
        sx={{
          opacity:  "1",
          color: theme.palette.brandblack.primary,
        }}
        noWrap
      >
        {text}
      </Typography>
    </Box>

)
  
  :(
    <NextLink href={link ? link : "#"}>
      <a
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => handleLogin()}
      >
        <Box
          display={"flex"}
          alignItems="center"
          sx={{ marginLeft: { xs: "16px" }, cursor: "pointer" }}
          height="100%"
        >
          <Avatar src={src} alt="avatar" />
          <Typography
            variant="h5"
            ml="10px"
            sx={{
              opacity: opacity ? ".7" : "1",
              color: theme.palette.brandblack.primary,
            }}
            noWrap
          >
            {text}
          </Typography>
        </Box>
      </a>
    </NextLink>
  );
}
