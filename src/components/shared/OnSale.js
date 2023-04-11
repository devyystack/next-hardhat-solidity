import { Button, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function OnSale({ text, textStyle, nft }) {
  const theme = useTheme();
  return (
    <>
      <Box className={nft ? "onsale-box-nft" : "onsale-box"}>
        <span
          style={{
            color: theme.palette.brandpurple.primary,
            textDecoration: textStyle ? "line-through" : "none",
          }}
        >
          {text}
        </span>
      </Box>
    </>
  );
}
