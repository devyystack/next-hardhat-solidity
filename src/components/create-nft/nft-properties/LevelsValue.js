import React, { useState } from "react";

//mui
import { Grid, Typography, Box } from "@mui/material";
import { Image } from "../../";
import { CustomProgressChip } from "src/components/shared";
import LevelsModal from "../properties-modal/LevelsModal";

export default function LevelsValue({
  levels,
  setLevels,
  validateLevels,
  openLevelsModal,
  handleModalClickOpen,
  handleLevelsModalClose,
}) {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={2} md={1}>
          <Image
            src="/assets/images/svgs/levelsicon.svg"
            sx={{ width: "49px", pt: 1 }}
          />
        </Grid>
        <Grid item xs={11} sm={9} md={10}>
          <Typography variant="h4">Levels</Typography>
          <Box display="flex">
            <Typography variant="body1">
              Numerical traits that show as progress bar
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1} sm={1} md={1}>
          <Image
            src="/assets/images/svgs/plusicon.svg"
            sx={{ width: "49px", pt: 1, cursor: "pointer" }}
            onClick={handleModalClickOpen}
          />
          <LevelsModal
            openLevelsModal={openLevelsModal}
            handleLevelsModalClose={handleLevelsModalClose}
            levels={levels}
            setLevels={setLevels}
            validateLevels={validateLevels}
          />
        </Grid>
      </Grid>
      <Grid container pt={3}>
        <Grid item xs={0} sm={2} md={1}></Grid>
        <Grid item xs={12} sm={12} md={10}>
          <Grid container spacing={2}>
            {levels[0]?.name !== "" &&
              levels?.length &&
              levels?.length > 0 &&
              levels?.map((data, index) => {
                if (
                  data?.name === "" ||
                  data?.minVal === "" ||
                  data?.maxVal === ""
                ) {
                  return;
                } else {
                  return (
                    <Grid item xs={12} sm={4} key={index}>
                      <CustomProgressChip
                        index={index}
                        data={data}
                        levels={levels}
                        setLevels={setLevels}
                      />
                    </Grid>
                  );
                }
              })}
          </Grid>
        </Grid>
        <Grid item xs={0} sm={1} md={1}></Grid>
      </Grid>
    </>
  );
}
