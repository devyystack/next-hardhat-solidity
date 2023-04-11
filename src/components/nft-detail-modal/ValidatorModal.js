import React, { useEffect, useState } from "react";
import { useAppContext } from "src/context-api/appContext";
import { CustomModal } from "../shared";
import { Typography, Box, Button, Divider, Stack } from "@mui/material";

export default function ValidatorModal({
  openSuccessModal,
  handleSuccessModalClose,
}) {
  const { dispatch } = useAppContext();
  // ROYALTIES_PERMISSION
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
          CAUTION!
        </Typography>

        <Typography gutterBottom variant="body1" pt="20px">
          This NFT could be stolen, please contact us on discord. Do you want to
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
            dispatch({ type: "ROYALTIES_PERMISSION", value: true });
            handleSuccessModalClose();
          }}
        >
          I agree
        </Button>
        <Button
          variant="outlinedInherit"
          sx={{ minWidth: "104px" }}
          onClick={() => {
            dispatch({ type: "ROYALTIES_PERMISSION", value: false });
            handleSuccessModalClose();
          }}
        >
          Cancel
        </Button>
      </Stack>
    </CustomModal>
  );
}
