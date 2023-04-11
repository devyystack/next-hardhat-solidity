import * as React from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { Container, Typography, Link, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  DropDownPrice,
  DropDownMarks,
  DropDownSaleType,
} from "../../components/shared";

import { ERC_721 } from "../../config";
import { NFT } from "src/components/nft";
import { GetAllCreatedNfts } from "../../apis";
import jwt_decode from "jwt-decode";
import { getUserCookie } from "../../utils/getCookies";
import { useAppContext } from "src/context-api/appContext";
import { queryParamFormatter } from "../../utils/queryStringFormetter";
import { Image } from "../../components";
import { converter } from "../../utils/ethConverter";
import { useRouter } from "next/router";

function Created() {
  const router = useRouter();

  const [nftData, setNftData] = React.useState([]);
  const [publicAddress, setPublicAddress] = React.useState("");
  const [token, setToken] = React.useState("");
  const { state, dispatch } = useAppContext();
  const { userData } = state;
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
  const [categories, setCategories] = React.useState(null);
  React.useEffect(() => {
    if (state?.categories.length > 0) {
      let result = state?.categories.map((a) => a.category_name);
      let sortedResult = result.sort();
      setCategories(sortedResult);
    }
  }, [state?.categories]);
  React.useEffect(() => {
    dispatch({ type: "SKIP_FILTER", value: 0 });
    dispatch({ type: "APPLY_FILTER", value: [] });
    dispatch({ type: "PRICE_FILTER", value: { min: 0, max: 0 } });
    dispatch({ type: "SALE_FILTER", value: [] });
  }, []);

  const { id } = router.query;

  React.useEffect(() => {
    if (tokenData) {
      const wallet = id;
      const address = wallet.toLowerCase();
      setPublicAddress(address);
      setPayloadData({ ...payloadData, address: address });
      setToken(tokenData);
      setNftData([]);
    }
  }, [tokenData, userData]);

  const getCreatedNfts = async (tokenId) => {
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

    if (state.saleFilter.length > 0) {
      Object.assign(payloadData, {
        type: JSON.stringify(state.saleFilter),
      });
    }

    if (state.priceFilter.min > 0 && state.priceFilter.max > 0) {
      let convertedPrice = {
        min: parseInt(converter(state.priceFilter.min, "eth", "wei")),
        max: parseInt(converter(state.priceFilter.max, "eth", "wei")),
      };

      Object.assign(payloadData, { range: JSON.stringify(convertedPrice) });
    }

    const result = await GetAllCreatedNfts(
      tokenId,
      queryParamFormatter(payloadData)
    );

    if (result?.data?.data) {
      if (result?.data?.is_success === false) {
        dispatch({ type: "PROFILE_NFTS", value: [] });
        return;
      }
      dispatch({ type: "PROFILE_NFTS", value: result?.data?.data });
      setBtnLabel("Load More");
    }
  };

  const handleMore = async () => {
    Object.assign(payloadData, { skip: skip + 12 });

    const result = await GetAllCreatedNfts(
      token,
      queryParamFormatter(payloadData)
    );

    if (result?.data?.data) {
      let oldArray = state.profileNfts;
      let newArray = result?.data?.data;
      let finalArray = [...oldArray, ...newArray];
      dispatch({ type: "PROFILE_NFTS", value: finalArray });
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
      getCreatedNfts(token);
    }
  }, [token, userData, state.appyFilter, state.saleFilter, state.priceFilter]);

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
        <Box sx={{ marginTop: "58px" }}>
          <Grid container mt={4} mb={6}>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={2}>
                <Grid item>
                  <DropDownMarks
                    isIcon={true}
                    src="/assets/images/svgs/select.svg"
                    text="Select Category"
                    data={categories}
                  />
                </Grid>

                <Grid item>
                  <DropDownPrice
                    isIcon={true}
                    src="/assets/images/svgs/dollar.svg"
                    text="Price"
                  />
                </Grid>
                <Grid item>
                  <DropDownSaleType
                    isIcon={true}
                    src="/assets/images/svgs/sale.svg"
                    text="Sale Type"
                    data={[
                      { name: "On Auction", keyValue: "auction" },
                      {
                        keyValue: "notOnSale",
                        name: "Not for Sale",
                      },
                      { keyValue: "hasOffer", name: "Offer" },
                      { keyValue: "onSale", name: "On Sale" },
                      { keyValue: "price", name: "Price" },
                    ]}
                  />
                </Grid>

                <Grid item>
                  <Box
                    className=""
                    sx={{ pb: { xs: 2, md: 0 }, ml: { xs: 0, md: 0 } }}
                  >
                    <Button
                      onClick={() => {
                        dispatch({ type: "CLEAR_ALL", value: true });
                        dispatch({ type: "SALE_FILTER", value: [] });
                        dispatch({ type: "APPLY_FILTER", value: [] });
                        dispatch({
                          type: "PRICE_FILTER",
                          value: { min: 0, max: 0 },
                        });
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
        </Box>

        <Grid container spacing={3}>
          {state?.profileNfts && state?.profileNfts.length > 0 ? (
            state?.profileNfts?.map((value, index) => {
              //let owners = value?.nft_owners[value?.nft_owners?.length - 1];
              let like = value?.likes;
              // console.log("like array", like)
              let owner = null;
              if (value?.contract_type === ERC_721) {
                owner = value?.nft_owners[0];
              } else {
                let reverseArray = value?.nft_owners; //reverse(); Removed reverse array function
                if (reverseArray && reverseArray.length > 1) {
                  for (const element of reverseArray) {
                    if (element?.put_on_sale) {
                      owner = element;
                      break;
                    }
                  }
                } else {
                  owner = value?.nft_owners[0];
                }
              }
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <NFT
                    nftId={value?._id}
                    linkKey={value?._id}
                    src={
                      process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                      value?.profile_image
                    }
                    imageType={value?.image_type}
                    name={value?.nft_name}
                    price={owner?.nft_price}
                    likes={like}
                    saleType={owner?.sale_type}
                    bidsCount={owner?.bids_count}
                    ownerAddress={owner?.owner_address}
                    endTime={owner?.end_date}
                    putOnSale={owner?.put_on_sale}
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

        {state?.profileNfts.length > 0 && (
          <Box
            mt={10}
            display="flex"
            textAlign={"center"}
            justifyContent="center"
          >
            <Typography
              variant="h4"
              sx={{ color: theme.palette.brandpurple.primary }}
            >
              {btnLabel !== "Load More" ||
              state.profileNfts.length < 12 ? null : (
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

export default Created;
