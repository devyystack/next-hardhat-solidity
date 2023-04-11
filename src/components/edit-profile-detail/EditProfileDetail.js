import React from "react";
//mui
import {
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Image } from "../../components";
import subSrting from "../../utils/subString";
// Toaster
import { toast } from "react-toastify";

export default function EditProfileDetail({
  name,
  setName,
  address,
  setAddress,
  wallet,
}) {
  const theme = useTheme();

  return (
    <Card>
      <Box padding={"49px 32px"}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">Display Name*</Typography>
            <Box display="flex">
              <Typography variant="body1">
                This is display name for your profile on marketplace.
              </Typography>
            </Box>
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="Wonder Women"
              variant="outlined"
              sx={{ width: "100%", pt: "12px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ pt: "36px" }}>
            <Typography variant="h6">Email Address*</Typography>

            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="test@test.com"
              variant="outlined"
              sx={{ width: "100%", pt: "12px" }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sx={{ pt: "36px" }}>
            <Typography pb={1} variant="h6">
              Wallet Address
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#F7F3FF;",
                width: "100%",

                borderRadius: "4px",
              }}
            >
              <Typography
                noWrap
                component="span"
                variant="body6"
                sx={{
                  color: theme.palette.brandblack.primary,
                  marginLeft: 1,
                  maxWidth: { xs: "200px", sm: "180px" },
                }}
              >
                {subSrting(wallet)}
              </Typography>
              <Box>
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(wallet);
                    toast.success("Wallet Copied!", { autoClose: 500 });
                  }}
                >
                  <Image
                    alt="verified"
                    src="/assets/images/svgs/copy.svg"
                    sx={{
                      width: { xs: "18px", sm: "27px" },
                      height: { xs: "18px", sm: "27px" },
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
