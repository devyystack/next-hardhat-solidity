


import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";

import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, Link, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ExploreCollectionCard } from "../../components/explore-collection";
import {
  CardHeadingGradient,
  CardHeading,
  CustomMenu,
  DropDownMarks,
  TrandingNft,
} from "../../components/shared";
import { GetCollectionsList } from "../../apis";
import ReactHtmlParser from "react-html-parser";
import { queryParamFormatter } from "../../utils/queryStringFormetter";
import { useAppContext } from "../../context-api/appContext";
import chevronDown from "@iconify/icons-carbon/chevron-down";
import chevronUp from "@iconify/icons-carbon/chevron-up";
import { Iconify, Image } from "../../components";

function CollectionsList() {
  const [skip, setSkip] = useState(0);
  const [btnLabel, setBtnLabel] = useState("Load More");
  const { dispatch, state } = useAppContext();
  const [payloadData, setPayloadData] = React.useState({
    views: "desc",
    skip: 0,
    limit: "12",
  });
  const [categories, setCategories] = React.useState(null);
  React.useEffect(() => {
    if (state?.categories.length > 0) {
      let result = state?.categories.map((a) => a.category_name);
      let sortedResult = result.sort();
      setCategories(sortedResult);
    }
  }, [state?.categories]);
  React.useEffect(() => {
    setPayloadData({ ...payloadData });
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  function handleClickOpenChevron(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleCloseChevron() {
    setAnchorEl(null);
  }

  const handleClick = () => {
    console.log("clicked");
  };

  const CollectinApiFunc = async () => {
    const payload = {
      views: "desc",
      skip: 0,
      limit: "12",
    };

    setPayloadData(payload);
    if (state.appyFilter.length > 0) {
      Object.assign(payloadData, {
        category: JSON.stringify(state.appyFilter),
      });
    }

    const result = await GetCollectionsList(queryParamFormatter(payloadData));

    if (result?.data?.data) {
      if (result?.data?.is_success === false) {
        dispatch({ type: "EXPLORE_COLLECTION", value: [] });
        return;
      }
      dispatch({ type: "EXPLORE_COLLECTION", value: result?.data?.data });
      setBtnLabel("Load More");
    }
    if (result?.data?.data.length === 0) {
      setBtnLabel("No More Data ...");
      return;
    }
  };

  const HandleLoadMoreApiFunc = async () => {
    Object.assign(payloadData, { skip: skip + 12 });

    const result = await GetCollectionsList(queryParamFormatter(payloadData));
    if (result?.data?.data) {
      let oldArray = state.exploreCollection;
      let newArray = result?.data?.data;
      let finalArray = [...oldArray, ...newArray];
      dispatch({ type: "EXPLORE_COLLECTION", value: finalArray });
      if (result?.data?.data.length === 0) {
        setBtnLabel("No More Data ...");
        return;
      }
      setSkip(skip + 12);
    }
  };

  const handleTrending = async () => {
    const payload = {
      likes: "desc",
      skip: "0",
      limit: "15",
    };

    setPayloadData(payload);

    const result = await GetCollectionsList(queryParamFormatter(payloadData)); // functin call axios api

    if (result?.data?.data) {
      dispatch({ type: "EXPLORE_COLLECTION", value: result?.data?.data });
      setBtnLabel("Load More");
    }
    if (result?.data?.data.length === 0) {
      setBtnLabel("No More Data ...");
      return;
    }
  };

  React.useEffect(async () => {
    setSkip(0);
    CollectinApiFunc();
  }, [state.appyFilter]);

  // React.useEffect(async () => {
  //   setSkip(0);
  //   CollectinApiFunc();
  // }, [state.bidsFilter]);

  const theme = useTheme();
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1300px",
        pt: "60px",
        height: "auto",
      }}
    >
      <Box
        sx={{
          width: "auto",
          height: "auto",
          justifyContent: "space-between",
          display: "flex",
          overflow: "hidden",
          alignItems: "center",
        }}
      >
        <CardHeading text="Collection Listings" />
      </Box>

      <Box maxWidth="500px" pt="12px" pb="12px">
        <Typography variant="h3Lightest">
        See all the details related to collection and keep track of them. You can 
        view all the collections listed on your marketplace.
          
        </Typography>
      </Box>

      <Grid container mt={2} mb={6}>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={2}>
            <Grid item>
              <TrandingNft
                onClick={() => {
                  handleTrending();
                  dispatch({ type: "TRENDING_FILTER", value: true });
                  dispatch({ type: "EXPLORE_COLLECTION", value: [] });
                  dispatch({ type: "APPLY_FILTER", value: [] });
                }}
                isIcon={true}
                src="/assets/images/svgs/top.svg"
                text="Top Collections"
              />
            </Grid>
            <Grid item>
              <DropDownMarks
                isIcon={true}
                src="/assets/images/svgs/select.svg"
                text="Select Category"
                data={categories}
              />
            </Grid>

            <Grid item>
              <Box
                className="pulse"
                sx={{ pb: { xs: 2, md: 0 }, ml: { xs: 0, md: 0 } }}
              >
                <Button
                  onClick={() => {
                    dispatch({ type: "CLEAR_ALL", value: true });

                    dispatch({ type: "TRENDING_FILTER", value: false });
                    dispatch({ type: "EXPLORE_COLLECTION", value: [] });
                    dispatch({ type: "APPLY_FILTER", value: [] });
                  }}
                  variant="containedInherit"
                  target="_blank"
                  sx={{
                    minHeight: 46.2,
                  }}
                >
                  Clear All
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          display="flex"
          justifyContent={{ md: "flex-end", sm: "flex-start" }}
          paddingTop={{ xs: "15px", sm: "0px" }}
        ></Grid>
      </Grid>

      <Box
        sx={{
          width: "100%",
          height: "auto",
          justifyContent: "center",
          display: "flex",
          overflow: "hidden",
          alignItems: "center",
          marginBottom: "24px !important",
        }}
      > 
      </Box>

      <Grid container spacing={3} pb="60px" sx={{ overflow: "hidden" }}>
        {state.exploreCollection && state.exploreCollection.length > 0 ? (
          state.exploreCollection?.map((value, index) => {
            let owner = value?.owner?.[value?.owner?.length - 1];
            return (
              <Grid
                item
                key={index}
                xs={12}
                sm={6}
                md={6}
                lg={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ExploreCollectionCard
                  value={value?._id}
                  linkKey={value?._id}
                  coverImage={
                    value?.profile_cover ? 
                    process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                    value?.profile_cover : "/assets/images/svgs/collection-card.jpg" 
                  }
                  avtarImage={
                    value?.profile_image ? 
                    process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                    value?.profile_image : "/assets/images/svgs/card-dp.jpg" 
                  }
                  collectionName={value?.collection_name}
                  ownerName={owner?.userName}
                  bodyText={ReactHtmlParser(value?.description)}
                />
              </Grid>
            );
          })
        ) : (
          <Box display="flex" justifyContent="center" width="100%">
            <Image
              alt="cover"
              src="/assets/images/svgs/noData.svg"
              sx={{
                width: "270px",
                height: "auto",
                mt: 6,
              }}
            />
          </Box>
        )}
      </Grid>

      <Box
        py={1}
        mt={4}
        display="flex"
        textAlign={"center"}
        justifyContent="center"
      >
        <Typography
          variant="h4"
          sx={{ color: theme.palette.brandpurple.primary }}
        >
          {btnLabel !== "Load More" ||
          state.exploreCollection.length < 12 ? null : (
            <Link
              onClick={HandleLoadMoreApiFunc}
              underline="always"
              color="inherit"
              sx={{ color: theme.palette.brandpurple.primary }}
            >
              {btnLabel}
            </Link>
          )}

          {/* )} */}
        </Typography>
      </Box>
    </Container>
  );
}

export default CollectionsList;
