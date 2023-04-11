import React, { useState } from "react";
// mui
import { Box, Typography, Grid } from "@mui/material";

// shared
import { ChooseTypeCard } from "../shared";
export default function ChooseType({ setCollectionType, collectionType }) {
  return (
    <Box pt="30px">
      <Box maxWidth={{ xs: "100%" }}>
        <Box>
          <Typography variant="h3">Choose Type</Typography>
        </Box>
        <Box>
          <Typography variant="body0">
            Choose “Single” if you want your collectible to be one of a kind or
            “Multiple” if you want to sell one collectible multiple times
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={3} pt={"20px"}>
        <Grid item xs={12} sm={6} md={4}>
          <ChooseTypeCard
            src="/assets/images/svgs/stagesingle.svg"
            text={"Stage Single"}
            info="If you want to stage the uniqueness and individuality of your NFT"
            onHover={() => setCollectionType("single")}
            hoverValue={collectionType === "single" ? true : false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ChooseTypeCard
            src="/assets/images/svgs/stagemultiple.svg"
            text={"Stage Multiple"}
            info="If you want to stage your NFT with a large number of community members"
            onHover={() => setCollectionType("multiple")}
            hoverValue={collectionType === "multiple" ? true : false}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
