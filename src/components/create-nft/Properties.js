import React, { useState } from "react";

// mui
import { Card, Box, Divider, OutlinedInput } from "@mui/material";
import { LevelsValue, PropertiesValue, UnblockContent } from "./nft-properties";
export default function Properties({
  checked,
  handleChange,
  levels,
  setLevels,
  validateLevels,
  openLevelsModal,
  handleModalClickOpen,
  handleLevelsModalClose,
  properties,
  setProperties,
  openPropertiesModal,
  handlePropertiesModalClickOpen,
  handlePropertiesModalClose,
  validateProperties,
  setUnBlockContentText,
}) {
  return (
    <Card>
      <Box width={"100%"} height="auto" p="60px">
        <PropertiesValue
          properties={properties}
          setProperties={setProperties}
          validateProperties={validateProperties}
          openPropertiesModal={openPropertiesModal}
          handlePropertiesModalClickOpen={handlePropertiesModalClickOpen}
          handlePropertiesModalClose={handlePropertiesModalClose}
        />
        <Box py="34px">
          <Divider />
        </Box>
        <LevelsValue
          levels={levels}
          setLevels={setLevels}
          validateLevels={validateLevels}
          openLevelsModal={openLevelsModal}
          handleModalClickOpen={handleModalClickOpen}
          handleLevelsModalClose={handleLevelsModalClose}
        />
        <Box py="34px">
          <Divider />
        </Box>
        <UnblockContent checked={checked} handleChange={handleChange} />
        {checked && (
          <Box sx={{ marginTop: "20px" }}>
            <OutlinedInput
              multiline
              cols="40"
              rows="5"
              sx={{ width: "100%" }}
              onChange={(e) => setUnBlockContentText(e.target.value)}
            />
          </Box>
        )}
      </Box>
    </Card>
  );
}
