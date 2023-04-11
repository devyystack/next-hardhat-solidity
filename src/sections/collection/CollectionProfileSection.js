import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import {
  Container,
  Typography,
  Link,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import { ERC_721 } from "../../config";
import { useTheme } from "@mui/material/styles";
import { ExploreCollectionCard } from "../../components/explore-collection";
import {
  CardHeading,
  TrandingNft,
  DropDownPrice,
  DropDownSaleType,
} from "../../components/shared";
import { Image } from "../../components";
import { NFT } from "src/components/nft";
import { useAppContext } from "src/context-api/appContext";
import { getUserCookie } from "../../utils/getCookies";

import { GetCollectionByid, GetAllNfts } from "../../apis";
import { queryParamFormatter } from "../../utils/queryStringFormetter";
import { converter } from "../../utils/ethConverter";
import { useRouter } from "next/router";
import NextLink from "next/link";

function CollectionProfileSection() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = React.useState([]);
  const [copiesCount, setCopiesCount] = React.useState(0);
  const { dispatch, state } = useAppContext();
  const [nftData, setNftData] = React.useState([]);
  const [skip, setSkip] = React.useState(0);
  const [btnLabel, setBtnLabel] = React.useState("Load More");

  let address = data?.[0]?.owner[0]?.publicAddress;

  useEffect(() => {
    if (state?.collectionProfileData) {
      setData(state?.collectionProfileData);
    }
  }, [state.collectionProfileData]);

  let nft = data[0]?.nfts?.[0];

  const getCollectionProfileNfts = async () => {
    const payload = {
      // likes: "desc",
      // views: "desc",
      skip: 0,
      limit: "12",
      collectionId: id,
    };

    if (state.priceFilter.min > 0 && state.priceFilter.max > 0) {
      let convertedPrice = {
        min: parseInt(converter(state.priceFilter.min, "eth", "wei")),
        max: parseInt(converter(state.priceFilter.max, "eth", "wei")),
      };

      Object.assign(payload, { range: JSON.stringify(convertedPrice) });
    }

    if (state.saleFilter.length > 0) {
      Object.assign(payload, { type: JSON.stringify(state.saleFilter) });
    }

    const result = await GetAllNfts(queryParamFormatter(payload));
    if (result?.data?.data) {
      if (result?.data?.is_success === false) {
        dispatch({ type: "PROFILE_NFTS", value: [] });
        return;
      }
      dispatch({ type: "PROFILE_NFTS", value: result?.data?.data });
      setBtnLabel("Load More");
    }
    if (result?.data?.data.length === 0) {
      setBtnLabel("No More Data ...");
      return;
    }
  };

  const handleMore = async () => {
    const payload = {
      // likes: "desc",
      // views: "desc",
      skip: 0,
      limit: "12",
      collectionId: id,
    };

    Object.assign(payload, { skip: skip + 12 });

    const result = await GetAllNfts(queryParamFormatter(payload));

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

  React.useEffect(() => {
    if (id) {
      getCollectionProfileNfts();
    }
  }, [id, state.priceFilter, state.saleFilter]);

  const theme = useTheme();
  return (
    <Container
      maxWidth={false}
      sx={{
        boxShadow: (theme) => ({
          xs: 0,
        }),
        maxWidth: "1300px",
        pt: "150px",
        height: "auto",
      }}
    >
      <Box
        sx={{
          marginBottom: "auto",
          maxWidth: "100%",
          maxHeight: "427px",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            maxHeight: "427px",
            minHeight: {
              xs: "130px",
              sm: "220px",
              md: "350px",
              lg: "427px",
            },
            maxWidth: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            alt="cover"
            src={
              data?.[0]?.profile_cover
                ? process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                  data?.[0]?.profile_cover
                : "/assets/images/svgs/collection-cover.jpg"
            }
            // src={bannerImage}
            sx={{
              borderRadius: 1.5,
              width: "100%",
              maxHeight: "427px",
              objectFit: "cover",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              display: "flex",
              alignItems: "flex-end",
              top: { xs: "74%", sm: "75%", md: "82%", lg: "85%" },
            }}
          >
            <Avatar
              alt="Avatar"
              src={
                data?.[0]?.profile_image
                  ? process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                    data?.[0]?.profile_image
                  : "/assets/images/svgs/cover-dp.jpg"
              }
              // src={avatarImage}
              sx={{
                width: { xs: 63, sm: 118, md: 127 },
                height: { xs: 63, sm: 118, md: 127 },
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: { xs: 6, sm: 10 },
          marginBottom: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            maxWidth: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography
            noWrap
            variant="h3"
            sx={{
              color: theme.palette.brandblack.primary,
              paddingRight: 1,
              fontSize: { xs: 18, sm: 26, md: 30, lg: 32 },
            }}
          >
            {data?.[0]?.collection_name}
            {/* {collectionName} */}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            maxWidth: "272px",
            bgcolor: "#F7F3FF;",
            paddingLeft: 2,
            paddingRight: 2,
            borderRadius: "20px",
            marginTop: 1,
            marginBottom: 2,
            justifyContent: "center",
          }}
        >
          <Typography
            component="span"
            variant="subtitle4"
            sx={{
              fontWeight: "medium",
              color: theme.palette.brandblack.primary,
              fontSize: { xs: 10, sm: 14 },
            }}
          >
            Created by
            <NextLink href={`/profile/${address}`}>
              <a style={{ textDecoration: "none" }}>
                <Box
                  component="span"
                  className="verified-clr"
                  sx={{
                    color: theme.palette.brandblue.secondary,
                    marginRight: 1,
                    cursor: "pointer",
                  }}
                >
                  &nbsp; {data?.[0]?.owner[0]?.userName}{" "}
                </Box>
              </a>
            </NextLink>
          </Typography>
          <Box></Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 2,
            marginBottom: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              marginRight: 4,
            }}
          >
            <Typography variant="h4" sx={{ width: "auto", height: "auto" }}>
              {nft ? nft?.nft_count : 0}
              <br></br>
            </Typography>
            items
          </Box>

          <Divider
            orientation="vertical"
            sx={{
              height: 38,
              marginTop: 1,
              bgcolor: theme.palette.brandpurple.primary,
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: 4,
            }}
          >
            <Typography variant="h4" sx={{ width: "auto", height: "auto" }}>
              {nft ? nft?.owners_count : 0}

              <br></br>
            </Typography>
            owners
          </Box>
        </Box>
      </Box>

      <Divider
        orientation="horizontal"
        sx={{
          maxWidth: "1300px",
          color: theme.palette.brandpurple.primary,
        }}
      />

      <Box sx={{ marginTop: "58px" }}>
        <Grid container mt={4} mb={6}>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
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
                      dispatch({ type: "TRENDING_FILTER", value: false });
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

      {
        <Grid container spacing={3} mt={2}>
          {state?.profileNfts && state?.profileNfts?.length > 0 ? (
            state?.profileNfts?.map((value, index) => {
              // let owner = value?.nft_owners[value?.nft_owners.length - 1];
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
              let like = value?.likes;
              // console.log("like array", like)

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
      }

      {state?.profileNfts.length > 0 ? (
        <Box
          py={1}
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
      ) : null}
    </Container>
  );
}

export default CollectionProfileSection;
