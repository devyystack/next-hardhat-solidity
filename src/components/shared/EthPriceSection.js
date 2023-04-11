import React from "react";
// mui
import { Box, Typography } from "@mui/material";
import { Image } from "../../components";

import { PriceSection } from ".";

export default function EthPriceSection({ price }) {
  return (
    <Box display={"flex"} alignItems="center">
      <Box sx={{ maxWidth: "41px", marginRight: "10px" }}>
        <Image src="/assets/images/svgs/etherum-light.svg" />
      </Box>
      <Box sx={{ marginRight: "10px" }}>
        <PriceSection text={price} />
      </Box>
      <Box sx={{ opacity: ".6" }}>
        {/* <Typography variant="body1">($1,068.06)</Typography> */}
      </Box>
    </Box>
  );
}
