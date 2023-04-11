import React from "react";
// mui
import { Card, Box, Typography, Grid } from "@mui/material";
import { Image } from "../../";
import { CustomInfoIcon } from "../";

export default function ChooseTypeCard({
  src,
  text,
  info,
  onHover,
  hoverValue,
}) {
  return (
    <Card
      sx={{ padding: "50px", cursor: "pointer" }}
      onMouseDown={onHover}
      className={hoverValue ? "box" : ""}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
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
          <Grid item>
            <Typography variant="h6">{text}</Typography>
          </Grid>
          <Grid item>
            <CustomInfoIcon
              src="/assets/images/svgs/infoicon.svg"
              text={info}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
