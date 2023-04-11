import * as React from "react";
import CustomModal from "./CustomModal";
import { Typography, Box, CircularProgress } from "@mui/material";

import { Image } from "../../";

/*******************End Bootstrap Dialg Box ************/
export default function LoadingModal({ openSuccessModal, title, text }) {
  return (
    <CustomModal openModal={openSuccessModal} title={title} handleClose={""}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        textAlign={"center"}
        height="100%"
      >
        <CircularProgress />
        <Typography gutterBottom variant="h5">
          {text}
        </Typography>
      </Box>
    </CustomModal>
  );
}
