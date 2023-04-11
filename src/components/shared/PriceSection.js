import { Box } from "@mui/system";
import { Typography, Tooltip } from "@mui/material";
import Image from "../../components/Image";
import { useTheme } from "@mui/material/styles";
import { toFixedNumber } from "../../utils/formatNumber";

export default function PriceSection({ src, text }) {
  const theme = useTheme();
  return (
    <Box display="flex" alignItems="center">
      {src && <Image src={src} maxWidth="15px" />}
      <Typography
        variant="h6"
        sx={{
          marginLeft: src ? "10px" : "0px",
          color: theme.palette.brandpurple.primary,
        }}
      >
        <Tooltip title={text ? text : ""} placement="top">
          <span>
            {toFixedNumber(text, 4)}
            {" ETH"}
          </span>
        </Tooltip>
      </Typography>
    </Box>
  );
}
