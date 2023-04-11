import PropTypes from "prop-types";
import { memo } from "react";

// @mui
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Image } from ".";

// ----------------------------------------------------------------------

Logo.propTypes = {
  isSimple: PropTypes.bool,
  onDark: PropTypes.bool,
  sx: PropTypes.object,
};

function Logo({ onDark = false, isSimple = false, sx }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const PRIMARY_MAIN = theme.palette.primary.main;
  const LIGHT_COLOR = theme.palette.common.white;
  const DARK_COLOR = theme.palette.grey[800];

  return (
    <Box
      sx={{
        width: 64,
        lineHeight: 0,
        cursor: "pointer",
        display: "inline-flex",
        ...sx,
      }}
    >
      {isSimple ? (
        <Image
          src="/assets/images/svgs/stagelogo.svg"
          alt="logo"
          sx={{ maxWidth: "49px", maxHeight: "49px" }}
        />
      ) : (
        <Image
          src="/assets/images/svgs/stagelogo.svg"
          alt="logo"
          sx={{ maxWidth: "49px", maxHeight: "49px" }}
        />
      )}
    </Box>
  );
}

export default memo(Logo);
