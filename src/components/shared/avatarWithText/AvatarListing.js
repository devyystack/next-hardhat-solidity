import React, { useEffect, useState } from "react";

// mui
import { Box, Typography, Avatar, Grid, Button } from "@mui/material";

// other
import jwt_decode from "jwt-decode";
import { getUserCookie } from "../../../utils/getCookies";
import { useAppContext } from "src/context-api/appContext";
import NextLink from "next/link";
import { toast } from "react-toastify";
export default function AvatarListing({
  src,
  copies,
  price,
  ownerName,
  address,
  opacity,
  link,
  putOnSale,
  onClick,
}) {
  const { state } = useAppContext();
  const { userData } = state;
  const [walletAddress, setWalletAddress] = useState("");
  useEffect(() => {
    const token = getUserCookie();
    if (token) {
      const decoded = jwt_decode(token);
      const wallet = decoded.publicAddress.toLowerCase();
      setWalletAddress(wallet);
    }
  }, [userData]);
  const handleLogin = () => {
    const token = getUserCookie();
    if (!token || token === "undefined" || token === undefined) {
      if (link.includes("/profile")) {
        toast.error("Sign in please.", { autoClose: 1500 });
      }
    }
  };
  return (
    <Grid container display="flex" alignItems="center">
      <Grid item xs={12} sm={2}>
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
      </Grid>
      <Grid item xs={12} sm={7}>
        <Box>
          <Box display="flex">
            {copies && (
              <Typography
                variant="subtitle1"
                ml="10px"
                sx={{ opacity: opacity ? ".7" : "1" }}
              >
                {copies}
                {copies === 1 ? " copy" : " copies"}
                {putOnSale && " on sale"}
              </Typography>
            )}
          </Box>
          <Box display="flex">
            <Typography variant="subtitle1" ml="10px">
              {"by " + ownerName}
            </Typography>
          </Box>
          <Box display="flex">
            {address && (
              <Typography
                noWrap
                variant="body1"
                ml="10px"
                sx={{ opacity: opacity ? ".7" : "1" }}
              >
                {address}
              </Typography>
            )}
          </Box>
        </Box>{" "}
      </Grid>
      {putOnSale && address.toLowerCase() !== walletAddress.toLowerCase() && (
        <Grid
          item
          xs={12}
          sm={3}
          display="flex"
          justifyContent={{ sx: "flex-start", sm: "flex-end" }}
        >
          <Button variant="containedInherit" onClick={onClick}>
            Buy Now
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
