import React, { useEffect, useState } from "react";
import { CustomModal } from "../shared";
import { Typography, Box, Button, Divider, Stack } from "@mui/material";

export default function DisclaimerModal({
  openSuccessModal,
  handleSuccessModalClose,
  buyModal,
}) {
  return (
    <CustomModal
      openModal={openSuccessModal}
      handleClose={handleSuccessModalClose}
    >
      <Box
        display="flex"
        justifyContent={"center"}
        flexDirection="column"
        alignItems={"center"}
        textAlign="center"
      >
        <Typography gutterBottom variant="h4">
          Disclaimer!
        </Typography>

        <Typography gutterBottom variant="body1" pt="20px">
          This NFT has not been minted on the blockchain yet. Do you want to
          proceed?
        </Typography>
      </Box>
      <Divider sx={{ height: 24, mt: 2, mb: 4 }} />
      <Stack
        direction="row"
        spacing={1}
        display="flex"
        justifyContent={"center"}
        pb="24px"
      >
        <Button
          variant="containedInherit"
          sx={{
            display: "flex",
            justifyContent: "center",
            minWidth: "104px",
          }}
          onClick={() => {
            handleSuccessModalClose();
            buyModal();
          }}
        >
          I agree
        </Button>
        <Button
          variant="outlinedInherit"
          sx={{ minWidth: "104px" }}
          onClick={() => {
            handleSuccessModalClose();
          }}
        >
          Cancel
        </Button>
      </Stack>
    </CustomModal>
  );
}
