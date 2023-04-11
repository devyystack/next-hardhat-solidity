import React, { useState } from "react";

//mui
import {
  Box,
  Grid,
  OutlinedInput,
  InputAdornment,
  Typography,
} from "@mui/material";
import { CustomDatePicker } from "../shared";
import { useTheme } from "@mui/material/styles";
import { STAGE_PERCENTAGE } from "../../config";
import { InfoModal } from "../../components";

export default function BidPrice({
  bidPrice,
  setBidPrice,
  bidStartDate,
  setBidStartDate,
  bidEndDate,
  setBidEndDate,
  modal,
}) {
  const theme = useTheme();
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const handleInfoModalClickOpen = () => {
    setOpenInfoModal(true);
  };
  const handleInfoModalClose = () => {
    setOpenInfoModal(false);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <Typography variant="h3">Minimum Bid*</Typography>
        </Box>
      </Grid>
      <Grid item xs={modal ? 12 : 8} pt="21px">
        <OutlinedInput
          id="outlined-adornment-weight"
          type="number"
          value={bidPrice}
          onChange={(e) => setBidPrice(e.target.value)}
          placeholder="Enter minimum bid"
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
          Service fee <b>{STAGE_PERCENTAGE}%.</b>
        </Typography>
      </Grid>
      <Grid item xs={modal ? 12 : 8} pt="25px">
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={6}>
            <Typography variant="h4">Starting Date*</Typography>
            <Box pt="20px" width="100%">
              <CustomDatePicker
                datePick={bidStartDate}
                setDate={setBidStartDate}
              />
            </Box>
          </Grid> */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Expiration Date*</Typography>
            <Box pt="20px" width="100%">
              <CustomDatePicker datePick={bidEndDate} setDate={setBidEndDate} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} pt={2}>
        <Typography
          variant="h3Light"
          sx={{
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          color={theme.palette.brandpurple.primary}
          onClick={handleInfoModalClickOpen}
        >
          Learn more how timed auction works
        </Typography>
      </Grid>
      <InfoModal
        openSuccessModal={openInfoModal}
        handleSuccessModalClose={handleInfoModalClose}
        text={
          "In an NFT auction, the seller sets a minimum price for a specific time period. Buyers can bid on how much they want to spend for the NFT as long as it is more than the minimum price. After that, the NFT is sold to the highest bidder at the end of the sale period"
        }
        title={"Info"}
      />
    </Grid>
  );
}
