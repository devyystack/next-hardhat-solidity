import PropTypes from "prop-types";
import { Stack, Typography, Paper, Box } from "@mui/material";
// icons
import emailIcon from "@iconify/icons-carbon/email";
import phoneIcon from "@iconify/icons-carbon/phone";
import closeFilled from "@iconify/icons-carbon/close-filled";
//
import Image from "../Image";
import Iconify from "../Iconify";
import TextIconLabel from "../TextIconLabel";
import { IconButtonAnimate } from "../animate";

// ----------------------------------------------------------------------

Popup.propTypes = {
  office: PropTypes.shape({
    address: PropTypes.string,
    country: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    photo: PropTypes.string,
  }),
  onClose: PropTypes.func,
};

export default function Popup({ office, onClose }) {
  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <Paper
      sx={{
        width: 220,
        overflow: "hidden",
        borderRadius: 1.5,
        mt: 2,
        ml: 2,
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", right: 4, top: 4, zIndex: 9 }}>
        <IconButtonAnimate size="small" onClick={handleClose}>
          <Iconify
            icon={closeFilled}
            sx={{
              width: 20,
              height: 20,
              opacity: 0.48,
              color: "common.white",
              "&:hover": { opacity: 1 },
              ...(!office.photo && {
                color: "text.disabled",
              }),
            }}
          />
        </IconButtonAnimate>
      </Box>

      {office.photo && <Image alt="photo" src={office.photo} ratio="4/3" />}

      <Stack
        spacing={1}
        sx={{
          p: 1.5,
          wordBreak: "break-all",
          ...(!office.photo && {
            p: 2,
            pr: 3.5,
          }),
        }}
      >
        {office.country && (
          <Typography variant="subtitle2">{office.country}</Typography>
        )}

        {office.address && (
          <Typography component="span" variant="caption">
            {office.address}
          </Typography>
        )}

        {office.email && (
          <TextIconLabel
            alignItems="flex-start"
            icon={
              <Iconify
                icon={emailIcon}
                sx={{ mr: 0.5, width: 18, height: 18, flexShrink: 0 }}
              />
            }
            value={office.email}
            sx={{ typography: "caption" }}
          />
        )}

        {office.phoneNumber && (
          <TextIconLabel
            icon={
              <Iconify
                icon={phoneIcon}
                sx={{ mr: 0.5, width: 18, height: 18, flexShrink: 0 }}
              />
            }
            value={office.phoneNumber}
            sx={{ typography: "caption" }}
          />
        )}
      </Stack>
    </Paper>
  );
}
