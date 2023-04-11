import React, { useEffect, useState } from "react";
import { CustomModal } from "../shared";
import { Typography, Box, Button, Divider, Stack } from "@mui/material";

export default function InfoModal({
  openSuccessModal,
  handleSuccessModalClose,
  text,
  title,
}) {
  return (
    <CustomModal
      openModal={openSuccessModal}
      handleClose={handleSuccessModalClose}
      title={title ? title : ""}
    >
      <Box
        display="flex"
        justifyContent={"center"}
        flexDirection="column"
        alignItems={"center"}
        textAlign="center"
      >
        <Typography gutterBottom variant="body1" pt="0px">
          {text ? text : "No data found!"}
        </Typography>
      </Box>
    </CustomModal>
  );
}
