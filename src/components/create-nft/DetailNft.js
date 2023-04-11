import React, { useState, useEffect } from "react";
//mui
import {
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  OutlinedInput,
  InputAdornment,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CustomInfoIcon, ToggleButton } from "../shared";
import { getUserCookie } from "../../utils/getCookies";
import { getCollectionByUserType } from "../../apis";
import jwt_decode from "jwt-decode";
import { useAppContext } from "src/context-api/appContext";

export default function DetailNft({
  nftName,
  setNftName,
  nftCollection,
  setNftCollection,
  royalties,
  setRoyalties,
  noOfCopies,
  setNoOfCopies,
  freeMintChecked,
  setFreeMintChecked,
  collectionType,
}) {
  const theme = useTheme();
  const { state } = useAppContext();
  const { userData } = state;
  const handleChange = (event) => {
    setFreeMintChecked(event.target.checked);
  };
  const [collectionData, setCollectionsData] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenSet = getUserCookie();
    setToken(tokenSet);
  }, [token, userData]);
  useEffect(() => {
    setCollectionsData([]);
    setNftCollection("");
  }, [collectionType, userData]);
  useEffect(async () => {
    if (token) {
      var decoded = jwt_decode(token);
      const userId = decoded.id;
      const payload = {
        creator: "user",
        userId: userId,
        collection_type: collectionType,
      };
      const collections = await getCollectionByUserType(token, payload);
      if (collections?.data?.data?.length > 0) {
        setCollectionsData(collections?.data?.data);
        return;
      } else {
        return;
      }
    }
  }, [nftCollection, token, collectionType, userData]);

  const handleChangeCollection = (event) => {
    const {
      target: { value },
    } = event;
    setNftCollection(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Card>
      <Box padding={"49px 32px"}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">Name*</Typography>
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="Enter NFT name"
              variant="outlined"
              sx={{ width: "100%", pt: "12px" }}
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} pt="40px">
            <Typography variant="h6">Collections*</Typography>
            <Box display="flex">
              <Typography variant="body1">
                This is the collection where your item will appear. &nbsp;
              </Typography>
              {/* <Typography
                variant="body1"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
                color={theme.palette.brandpurple.primary}
              >
                Learn More
              </Typography> */}
            </Box>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={nftCollection === "" ? "none" : nftCollection}
              onChange={handleChangeCollection}
              input={<OutlinedInput />}
              sx={{ width: "100%" }}
            >
              <MenuItem key="0" disabled value="none">
                Select Collection
              </MenuItem>

              {collectionData &&
                collectionData?.map((data, index) => (
                  <MenuItem key={index} value={data?._id}>
                    {data?.collection_name}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
          <Grid item xs={12} pt="40px">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">Royalties*</Typography>
                <Box pt="12px">
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    type="number"
                    value={royalties}
                    onChange={(e) => setRoyalties(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">No. of Copies*</Typography>
                <TextField
                  type="number"
                  value={noOfCopies}
                  onChange={(e) =>
                    setNoOfCopies(Number(Math.floor(e.target.value)))
                  }
                  id="filled-hidden-label-normal"
                  placeholder="Enter Quantity"
                  variant="outlined"
                  disabled={collectionType === "single" ? true : false}
                  sx={{ width: "100%", pt: "12px" }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} py="40px">
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={8}>
                <Box display="flex">
                  <Typography variant="h6">Free Minting</Typography>
                  &nbsp;
                  <CustomInfoIcon
                    src="/assets/images/svgs/infoicon.svg"
                    text="Do you want to list your NFT for free?"
                  />
                </Box>
                <Typography variant="body1">
                  Buyer will pay Gas for minting:
                </Typography>
              </Grid>
              <Grid item xs={4} display="flex" justifyContent={"flex-end"}>
                <ToggleButton
                  status={freeMintChecked}
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
