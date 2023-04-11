import * as React from "react";
import CustomModal from "./CustomModal";
import { Typography, Box } from "@mui/material";

import { Image } from "../../";

/*******************End Bootstrap Dialg Box ************/
export default function SuccessModal({
  openSuccessModal,
  title,
  handleModalClickClose,
}) {
  return (
    <CustomModal
      openModal={openSuccessModal}
      title={title}
      handleClose={handleModalClickClose}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        textAlign={"center"}
        height="100%"
      >
        <Image src="/assets/images/svgs/checkcircle.svg" />
        <Typography gutterBottom variant="h5">
          This item has been reported successfully
        </Typography>
      </Box>
    </CustomModal>
  );
}
