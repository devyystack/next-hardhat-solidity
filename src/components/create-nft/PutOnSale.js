import React, { useState } from "react";

// mui
import { Box, Grid, Typography } from "@mui/material";
import { SaleCard, ToggleButton } from "../shared";
import { SalePrice, BidPrice } from "../";

export default function PutOnSale({
  checkedPutOnSale,
  handleChangePutOnSale,
  checkPriceType,
  setCheckPriceType,
  nftFixedPrice,
  setNftFixedPrice,
  bidPrice,
  setBidPrice,
  bidStartDate,
  setBidStartDate,
  bidEndDate,
  setBidEndDate,
  collectionType,
  modal,
}) {
  return (
    <Box pt={modal ? "0px" : "20px"}>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Box>
            <Typography variant="h3">Put on Sale</Typography>
          </Box>
          <Box sx={{ pt: modal ? "0px" : "0px" }}>
            <Typography variant="h3Light">
              Choose the relevant option below to proceed with your NFT creation
              process
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} display="flex" justifyContent={"flex-end"}>
          <ToggleButton
            status={checkedPutOnSale}
            handleChange={handleChangePutOnSale}
          />
        </Grid>
      </Grid>
      {checkedPutOnSale && (
        <Grid container spacing={3} pt={"20px"}>
          <Grid item xs={12} sm={6} md={modal ? 6 : 4}>
            <SaleCard
              src="/assets/images/svgs/fixedprice.svg"
              text={"Fixed Price"}
              info="Enter price to allow users instantly 
purchase your NFT"
              onHover={() => setCheckPriceType("price")}
              checkPriceType={checkPriceType === "price" ? true : false}
            />
          </Grid>
          {collectionType === "single" && (
            <Grid item xs={12} sm={6} md={modal ? 6 : 4}>
              <SaleCard
                src="/assets/images/svgs/timedauction.svg"
                text={"Timed Auction"}
                info="Set a period of time for which buyers can place bids"
                onHover={() => setCheckPriceType("time")}
                checkPriceType={checkPriceType === "time" ? true : false}
              />
            </Grid>
          )}
        </Grid>
      )}
      {checkedPutOnSale &&
        (checkPriceType === "price" ? (
          <Grid container spacing={3} pt={"20px"}>
            <Grid item xs={12} md={modal ? 12 : 8}>
              <SalePrice
                nftFixedPrice={nftFixedPrice}
                setNftFixedPrice={setNftFixedPrice}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3} pt={"20px"}>
            <Grid item xs={12}>
              <BidPrice
                bidPrice={bidPrice}
                setBidPrice={setBidPrice}
                bidStartDate={bidStartDate}
                setBidStartDate={setBidStartDate}
                bidEndDate={bidEndDate}
                setBidEndDate={setBidEndDate}
                modal={modal}
              />
            </Grid>
          </Grid>
        ))}
    </Box>
  );
}
