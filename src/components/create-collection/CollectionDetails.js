import React from "react";
//mui
import {
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  OutlinedInput,
  InputAdornment,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CustomInfoIcon, ToggleButton } from "../shared";
import { CollectionCategory } from "../../components";

export default function CollectionDetails({
  collectionName,
  setCollectionName,
  // contractName,
  // setContractName,
  // symbol,
  // setSymbol,
  category,
  setCategory,
}) {
  const theme = useTheme();

  return (
    <Card>
      <Box padding={"49px 32px"}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">Collection Name*</Typography>
            <Box display="flex">
              <Typography variant="body1">
                This is the collection where your item will appear. &nbsp;
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
                color={theme.palette.brandpurple.primary}
              >
                Learn More
              </Typography>
            </Box>
            <TextField
              id="filled-hidden-label-normal"
              placeholder="Test-1123"
              variant="outlined"
              sx={{ width: "100%", pt: "12px" }}
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
            />
          </Grid>
          {/* <Grid item xs={12} sx={{ pt: "36px" }}>
            <Typography variant="h6">Contract Name*</Typography>
            <Box display="flex">
              <Typography variant="body1">
                This is contract name and it cannot be changed. &nbsp;
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
                color={theme.palette.brandpurple.primary}
              >
                Learn More
              </Typography>
            </Box>
            <TextField
              id="filled-hidden-label-normal"
              placeholder="Test-1123"
              variant="outlined"
              sx={{ width: "100%", pt: "12px" }}
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ pt: "36px" }}>
            <Typography variant="h6">Symbol*</Typography>
            <Box display="flex">
              <Typography variant="body1">
                This is contract symbol and it cannot be changed. &nbsp;
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
                color={theme.palette.brandpurple.primary}
              >
                Learn More
              </Typography>
            </Box>
            <TextField
              id="filled-hidden-label-normal"
              placeholder="Test-1123"
              variant="outlined"
              sx={{ width: "100%", pt: "12px" }}
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </Grid> */}

          <Grid item xs={12} sx={{ pt: "36px" }}>
            <CollectionCategory category={category} setCategory={setCategory} />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
