import React, { useEffect, useState } from "react";

//mui
import {
  Box,
  Grid,
  OutlinedInput,
  InputAdornment,
  Typography,
  Tooltip,
} from "@mui/material";
import { STAGE_PERCENTAGE } from "../../config";
import { toFixedNumber } from "../../utils/formatNumber";

export default function SalePrice({ nftFixedPrice, setNftFixedPrice }) {
  const [ethers, setEthers] = useState(0);
  useEffect(() => {
    let etherPrice = (nftFixedPrice * STAGE_PERCENTAGE) / 100;
    let profitEthers = nftFixedPrice - etherPrice;
    setEthers(profitEthers);
  }, [nftFixedPrice]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <Typography variant="h3">Price*</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} pt="21px">
        <OutlinedInput
          id="outlined-adornment-weight"
          type="number"
          value={nftFixedPrice}
          onChange={(e) => setNftFixedPrice(e.target.value)}
          placeholder="Enter price"
          endAdornment={<InputAdornment position="end">ETH</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
          sx={{ width: "100%" }}
        />
      </Grid>

      <Grid item xs={12} pt="10px" display={"flex"}>
        <Typography variant="h3Light">
          Service fee <b>{STAGE_PERCENTAGE}%.</b> You will receive{" "}
          <Tooltip title={ethers ? ethers : ""} placement="top">
            <b>{ethers && toFixedNumber(ethers, 4)} ETH</b>
          </Tooltip>
        </Typography>
      </Grid>
    </Grid>
  );
}
