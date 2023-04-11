import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { Typography } from "@mui/material";

// other
import { Image } from "../../";

// ***************Bootstrap Dialog Box *************

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, hideClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {!hideClose && onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Image
            src="/assets/images/svgs/modalClose.svg"
            sx={{ width: "20px", height: "20px" }}
          />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
/*******************End Bootstrap Dialg Box ************/
export default function CustomModal({
  openModal,
  title,
  handleClose,
  children,
}) {
  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={openModal}
        scroll={"paper"}
        TransitionComponent={Transition}
        keepMounted
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose === "" ? () => {} : handleClose}
          hideClose={handleClose === "" ? true : false}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent
          sx={{
            width: { xs: "auto", sm: "500px" },
            height: { xs: "300px", sm: "auto" },
            maxWidth: "500px",
            mx: { sm: "30px", xs: "auto" },
            mt: "2",
          }}
          className="verticle-scroll"
        >
          {children}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
