import * as React from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import {
  Container,
  CircularProgress,
  Typography,
  Link,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TrandingNft, DropDownMarks } from "../../components/shared";
import { NFT } from "src/components/nft";
import { ExploreCollectionCard } from "../../components/explore-collection";
import { GetCollectionByUserId } from "../../apis";
import { getUserCookie } from "../../utils/getCookies";
import jwt_decode from "jwt-decode";
import ReactHtmlParser from "react-html-parser";
import { queryParamFormatter } from "../../utils/queryStringFormetter";
import { useAppContext } from "src/context-api/appContext";
import { Image } from "../../components";
import { useRouter } from "next/router";

function Collections() {
  const router = useRouter();

  const { state, dispatch } = useAppContext();
  const { userData } = state;
  const [collectionData, setcollectionData] = React.useState([]);
  const [token, setToken] = React.useState("");
  const [publicAddress, setPublicAddress] = React.useState("");
  const tokenData = getUserCookie();
  const [skip, setSkip] = React.useState(0);
  const [btnLabel, setBtnLabel] = React.useState("Load More");
  const [payloadData, setPayloadData] = React.useState({
    views: "desc",
    likes: "desc",
    skip: 0,
    limit: 12,
    address: "",
  });

  const { id } = router.query;
  const [categories, setCategories] = React.useState(null);
  React.useEffect(() => {
    if (state?.categories.length > 0) {
      let result = state?.categories.map((a) => a.category_name);
      let sortedResult = result.sort();
      setCategories(sortedResult);
    }
  }, [state?.categories]);
  React.useEffect(() => {
    if (tokenData) {
      const wallet = id;
      const address = wallet.toLowerCase();
      setPublicAddress(address);
      setPayloadData({ ...payloadData, address: address });
      setToken(tokenData);
      setcollectionData([]);
    }
  }, [tokenData, userData]);

  const getCollectionsData = async (tokenId) => {
    const payload = {
      views: "desc",
      likes: "desc",
      skip: 0,
      limit: 12,
      address: publicAddress,
    };

    setPayloadData(payload);

    if (state.appyFilter.length > 0) {
      Object.assign(payloadData, {
        category: JSON.stringify(state.appyFilter),
      });
    }

    const result = await GetCollectionByUserId(
      tokenId,
      queryParamFormatter(payloadData)
    );

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

  const handleMore = async () => {
    Object.assign(payloadData, { skip: skip + 12 });

    const result = await GetCollectionByUserId(
      token,
      queryParamFormatter(payloadData)
    );

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

  React.useEffect(async () => {
    if (token) {
      setSkip(0);
      getCollectionsData(token);
    }
  }, [token, userData, state.appyFilter]);

  const theme = useTheme();
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          boxShadow: (theme) => ({
            xs: 0,
          }),
          maxWidth: "1300px",

          height: "auto",
        }}
      >
        <Box sx={{ marginTop: "58px", maxWidth: "100%" }}>
          <Grid container mt={4} mb={6}>
            <Grid item xs={12} sm={2}>
              <Grid container spacing={2}>
                <Grid item>
                  <DropDownMarks
                    isIcon={true}
                    src="/assets/images/svgs/select.svg"
                    text="Select Category"
                    data={categories}
                  />
                </Grid>
                {/* <Grid item>
                  <TrandingNft
                    isIcon={true}
                    src="/assets/images/svgs/filter.svg"
                    text="Add Filters"
                  />
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box
                className=""
                sx={{ pb: { xs: 2, md: 0 }, ml: { xs: 0, md: 0 } }}
              >
                <Button
                  onClick={() => {
                    dispatch({ type: "APPLY_FILTER", value: [] });
                  }}
                  variant="containedInherit"
                  target="_blank"
                  sx={{
                    minHeight: 46.2,
                  }}
                >
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3} pb="60px" sx={{ overflow: "hidden" }}>
          {state?.exploreCollection && state?.exploreCollection.length > 0 ? (
            state.exploreCollection?.map((value, index) => {
              let owner = value?.owner[value?.owner?.length - 1];

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
                      process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                      value?.profile_cover
                    }
                    avtarImage={
                      process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                      value?.profile_image
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
        {state?.exploreCollection.length > 0 && (
          <Box
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
              state?.exploreCollection.length < 12 ? null : (
                <Link
                  onClick={handleMore}
                  underline="always"
                  color="inherit"
                  sx={{ color: theme.palette.brandpurple.primary }}
                >
                  {btnLabel}
                </Link>
              )}
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

export default Collections;
