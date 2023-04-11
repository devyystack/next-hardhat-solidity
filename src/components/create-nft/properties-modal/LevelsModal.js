import React from "react";
import { CustomModal } from "../../shared";
import { Typography, Box, Button, Grid } from "@mui/material";
import LevelsInput from "../properties-inputs/LevelsInput";

export default function LevelsModal({
  openLevelsModal,
  handleLevelsModalClose,
  levels,
  setLevels,
  validateLevels,
}) {
  const updateLevelsData = (value, data) => {
    const updateLevels = [...levels];
    const targetIndex = updateLevels[value];
    updateLevels[value] = { ...targetIndex, ...data };
    setLevels(updateLevels);
  };

  const removeLevels = (value) => {
    const updateLevels = [...levels]; // make a separate copy of the array
    if (value !== -1 && updateLevels.length > 1) {
      updateLevels.splice(value, 1);
      setLevels(updateLevels);
    } else {
      updateLevels.splice(value, 1);
      setLevels([{ name: "", minVal: "", maxVal: "" }]);
    }
  };
  return (
    <CustomModal
      openModal={openLevelsModal}
      handleClose={handleLevelsModalClose}
    >
      <Box>
        <Typography gutterBottom variant="h3">
          Add Levels
        </Typography>
        {/* <Typography gutterBottom variant="body1">
          Levels show up underneath your item, are clickable, and can be
          filtered in your collection's sidebar.
        </Typography> */}
      </Box>
      <Grid container pt="10px">
        <Grid item xs={12}>
          {levels.map((data, index) => (
            <LevelsInput
              key={index}
              name={data.name}
              minVal={data.minVal}
              maxVal={data.maxVal}
              index={index}
              updateLevel={updateLevelsData}
              removeLevels={removeLevels}
            />
          ))}
        </Grid>
      </Grid>
      <Grid container pt="45px">
        <Grid item xs={0} md={2}></Grid>
        <Grid item xs={12} md={8}>
          <Button
            variant="outlinedInherit"
            onClick={() => {
              setLevels([...levels, { name: "", minVal: "", maxVal: "" }]);
            }}
            fullWidth
            sx={{ height: "55px" }}
          >
            Add more
          </Button>
        </Grid>
        <Grid item xs={0} md={2}></Grid>
      </Grid>
      <Grid container pt={"30px"} pb="52px">
        <Grid item xs={0} md={2}></Grid>
        <Grid item xs={12} md={8}>
          <Button
            variant="containedInherit"
            fullWidth
            sx={{ height: "55px" }}
            onClick={validateLevels}
          >
            Save
          </Button>
        </Grid>
        <Grid item xs={0} md={2}></Grid>
      </Grid>
    </CustomModal>
  );
}
