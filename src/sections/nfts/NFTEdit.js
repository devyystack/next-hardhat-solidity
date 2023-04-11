import React, { useState } from "react";

// mui
import { Container, Grid, Box, Typography, TextField } from "@mui/material";
import { CardHeadingGradient } from "../../components/shared";

//other
import {
  ChooseType,
  DetailNft,
  FilesDragAndDrop,
  Preview,
  DescriptionNFT,
  PutOnSale,
  Properties,
  SuccessNFT,
  SalePrice,
} from "../../components";

export default function NFTEdit() {
  const [editorState, setEditorState] = useState("");
  return (
    <Container
      maxWidth={false}
      sx={{
        boxShadow: (theme) => ({
          xs: 0,
        }),
        maxWidth: "1300px",
        pt: "160px",
      }}
    >
      <Box
        sx={{
          width: "auto",
          height: "auto",
          justifyContent: "space-between",
          display: "flex",
          overflow: "hidden",
          alignItems: "center",
        }}
      >
        <CardHeadingGradient text="Edit Your NFT" />
      </Box>
      <Box maxWidth="800px" pt="24px">
        <Typography variant="h3Light">
          You can edit your details related to your nft here
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={2} pt="54px">
            <Grid item xs={12} md={8}>
              <Typography variant="h6">Name*</Typography>
              <TextField
                hiddenLabel
                id="filled-hidden-label-normal"
                placeholder="Test-1123"
                variant="outlined"
                sx={{ width: "100%", pt: "12px" }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box pt="48px">
                <DescriptionNFT
                  editorState={editorState}
                  setEditorState={setEditorState}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box pt="28px">
                <PutOnSale />
                {/* <SalePrice /> */}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box pt="48px">
                <Properties />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
