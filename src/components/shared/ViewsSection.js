import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Image from "../../components/Image";
import priceConverter from "../../utils/priceConverter";
import jwt_decode from "jwt-decode";
import { getUserCookie } from "../../utils/getCookies";
import { AddView } from "../../apis";
import { useAppContext } from "src/context-api/appContext";

export default function ViewsSection({ src, views, nftId, size }) {
  const { state } = useAppContext();
  const { userData } = state;
  const token = getUserCookie();
  const [viewsCount, setViews] = useState(0);
  const [id, setId] = useState("");

  useEffect(() => {
    if (nftId) setId(nftId);
  }, [nftId]);
  useEffect(async () => {
    if (token) {
      if (id) {
        let decoded = jwt_decode(token);
        let user = decoded.publicAddress.toLowerCase();
        let nft = id;
        const payload = {
          user: user,
          nft: nft,
        };
        const result = await AddView(token, payload);
        if (result?.data?.data) {
          setViews(result?.data?.data);
        }
      }
    }
  }, [token, id, userData]);
  useEffect(() => {
    if (views && views > 0) setViews(parseInt(views));
  }, [views, userData]);
  return (
    <Box display="flex" alignItems="center">
      <Image src={src} maxWidth={size ? "20px" : "15px"} />
      <Typography variant={size ? "subtitle0" : "subtitle4"} sx={{ ml: "8px" }}>
        {viewsCount && priceConverter(viewsCount)}
      </Typography>
    </Box>
  );
}
