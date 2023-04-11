import React from "react";
//mui
import { Box, Grid, Container, Typography, Button, Link } from "@mui/material";
import { Image } from "../../components";
import { useTheme } from "@mui/material/styles";
import { DropDownMarks, TrandingNft } from "../../components/shared";
import { queryParamFormatter } from "../../utils/queryStringFormetter";
import { useAppContext } from "../../context-api/appContext";

import { GetAllNfts } from "../../apis";

import { ERC_721 } from "../../config";

// common
import { NFT } from "src/components/nft";
import ExoloreNftHeader from "./ExoloreNftHeader";
// routes

export default function NftLandingExplore({ isFilters }) {
  const { dispatch, state } = useAppContext();
  const [payloadData, setPayloadData] = React.useState({});

  React.useEffect(() => {
    dispatch({ type: "APPLY_FILTER", value: [] });
    dispatch({ type: "SALE_FILTER", value: [] });
  }, []);

  const getAllNftsData = async () => {
    const payload = {
      views: "desc",
      likes: "desc",
      skip: "0",
      limit: "12",
    };

    setPayloadData(payload);

    if (state.appyFilter.length > 0) {
      Object.assign(payloadData, {
        category: JSON.stringify(state.appyFilter),
      });
    }

    if (state.saleFilter.length > 0) {
      Object.assign(payloadData, { type: JSON.stringify(state.saleFilter) });
    }

    const result = await GetAllNfts(queryParamFormatter(payloadData));

    if (result?.data?.data) {
      if (result?.data?.is_success === false) {
        dispatch({ type: "PROFILE_NFTS", value: [] });
        return;
      }

      dispatch({ type: "PROFILE_NFTS", value: result?.data?.data });
    }
  };

  React.useEffect(() => {
    getAllNftsData();
  }, [state.appyFilter]);

  React.useEffect(() => {
    getAllNftsData();
  }, [state.saleFilter]);

  return (
    <Container
      maxWidth={false}
      sx={{
        boxShadow: (theme) => ({
          xs: 0,
        }),
        maxWidth: "1300px",
        pt: "100px",
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
        <ExoloreNftHeader heading="Explore" subHeading="Explore All" />
      </Box>

      <Grid container spacing={1} mt={isFilters ? 2 : 4}>
        {state?.profileNfts && state?.profileNfts.length > 0 ? (
          state?.profileNfts?.map((value, index) => {
            let nftLikes = value?.likes;
            //  let owner = value?.nft_owners[value?.nft_owners.length - 1];
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
              <Grid item xs={12} md={3} key={index}>
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
                  likes={nftLikes}
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
    </Container>
  );
}
