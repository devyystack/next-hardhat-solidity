import React, { useState } from "react";

//mui
import { Grid, Typography, Box } from "@mui/material";
import { Image } from "../../";
import { CustomChip } from "../../shared";
import PropertiesModal from "../properties-modal/PropertiesModal";

export default function PropertiesValue({
  properties,
  setProperties,
  validateProperties,
  openPropertiesModal,
  handlePropertiesModalClickOpen,
  handlePropertiesModalClose,
}) {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={2} md={1}>
          <Image
            src="/assets/images/svgs/propertiesicon.svg"
            sx={{ width: "49px", pt: 1 }}
          />
        </Grid>
        <Grid item xs={11} sm={9} md={10}>
          <Typography variant="h4">Properties</Typography>
          <Box display="flex">
            <Typography variant="body1">
              Textual traits that show as text box
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1} sm={1} md={1}>
          <Image
            src="/assets/images/svgs/plusicon.svg"
            sx={{ width: "49px", pt: 1, cursor: "pointer" }}
            onClick={handlePropertiesModalClickOpen}
          />
          <PropertiesModal
            properties={properties}
            setProperties={setProperties}
            validateProperties={validateProperties}
            openPropertiesModal={openPropertiesModal}
            handlePropertiesModalClose={handlePropertiesModalClose}
          />
        </Grid>
      </Grid>
      <Grid container pt={3}>
        <Grid item xs={0} sm={2} md={1}></Grid>
        <Grid item xs={12} sm={19} md={10}>
          <Grid container spacing={2}>
            {properties[0]?.name !== "" &&
              properties?.length &&
              properties?.length > 0 &&
              properties?.map((data, index) => {
                if (data?.name === "" || data?.type === "") {
                  return;
                } else {
                  return (
                    <Grid item key={index}>
                      <CustomChip
                        title={data?.name}
                        value={data?.type}
                        index={index}
                        properties={properties}
                        setProperties={setProperties}
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
