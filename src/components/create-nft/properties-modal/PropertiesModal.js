import React, { useState } from "react";
import { CustomModal } from "../../shared";
import { Typography, Box, Button, Grid } from "@mui/material";
import PropertiesInput from "../properties-inputs/PropertiesInput";

export default function PropertiesModal({
  properties,
  setProperties,
  validateProperties,
  openPropertiesModal,
  handlePropertiesModalClose,
}) {
  const updatePropertiesData = (value, data) => {
    const updateProperties = [...properties];
    const targetIndex = updateProperties[value];
    updateProperties[value] = { ...targetIndex, ...data };
    setProperties(updateProperties);
  };

  const removePropertiesData = (value) => {
    const updateProperties = [...properties]; // make a separate copy of the array
    if (value !== -1 && updateProperties.length > 1) {
      updateProperties.splice(value, 1);
      setProperties(updateProperties);
    } else {
      updateProperties.splice(value, 1);
      setProperties([{ name: "", type: "" }]);
    }
  };
  return (
    <CustomModal
      openModal={openPropertiesModal}
      handleClose={handlePropertiesModalClose}
    >
      <Box>
        <Typography gutterBottom variant="h3">
          Add Properties
        </Typography>
        <Typography gutterBottom variant="body1">
          Properties will be shown under the NFT detail section.
        </Typography>
      </Box>

      <Grid container pt="30px">
        <Grid item xs={12}>
          {properties.map((data, index) => (
            <PropertiesInput
              key={index}
              name={data?.name}
              type={data?.type}
              index={index}
              updatePropertiesData={updatePropertiesData}
              removePropertiesData={removePropertiesData}
            />
          ))}
        </Grid>
      </Grid>
      <Grid container pt="45px">
        <Grid item xs={0} md={2}></Grid>
        <Grid item xs={12} md={8}>
          <Button
            variant="outlinedInherit"
            fullWidth
            sx={{ height: "55px" }}
            onClick={() => {
              setProperties([...properties, { name: "", type: "" }]);
            }}
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
            target="_blank"
            rel="noopener"
            fullWidth
            sx={{ height: "55px" }}
            onClick={validateProperties}
          >
            Save
          </Button>
        </Grid>
        <Grid item xs={0} md={2}></Grid>
      </Grid>
    </CustomModal>
  );
}
