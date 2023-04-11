import React from "react";
// mui
import { Card, Box, Typography, Grid } from "@mui/material";
import { Image } from "../../";
export default function SaleCard({ src, text, info, checkPriceType, onHover }) {
  return (
    <Card
      sx={{ padding: "50px", height: "320px", cursor: "pointer" }}
      onMouseDown={onHover}
      className={checkPriceType ? "box" : ""}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
        textAlign="center"
      >
        <Image src={src} sx={{ width: "93px" }} />
        <Grid
          container
          pt="37px"
          display={"flex"}
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Grid item xs={12}>
            <Typography variant="h6">{text}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body3">{info}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
