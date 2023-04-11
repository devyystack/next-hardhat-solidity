import * as React from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { TrandingNft } from "../../components/shared";
import { NFT } from "src/components/nft";
import { getFavoriteNfts } from "../../apis";
import { Image } from "../../components";

import { getUserCookie } from "../../utils/getCookies";
import jwt_decode from "jwt-decode";
import { useAppContext } from "src/context-api/appContext";
import { useRouter } from "next/router";

import { ERC_721 } from "../../config";

function Favourites() {
  const { state, dispatch } = useAppContext();
  const { userData } = state;
  const [nftData, setNftData] = React.useState([]);
  const [skip, setSkip] = React.useState(0);
  const [moreButton, setMoreButton] = React.useState(false);
  const [publicAddress, setPublicAddress] = React.useState("");
  const [token, setToken] = React.useState("");
  const [disabled, setDisabled] = React.useState({
    toggle: false,
    msg: "No more data...",
  });

  const router = useRouter();
  const { id } = router.query;

  const tokenData = getUserCookie();
  React.useEffect(() => {
    if (tokenData) {
      const address = id?.toLowerCase();
      setPublicAddress(address);
      setToken(tokenData);
      setNftData([]);
    }
  }, [tokenData, userData]);

  const getFavoriteNftsData = async (token, publicAddress, skip) => {
    const nfts = await getFavoriteNfts(token, publicAddress, skip);

    console.log("fav nfts...", nfts);

    if (nfts?.data?.data.length === 0) {
      setDisabled((prev) => {
        return {
          ...prev,
          toggle: true,
          msg: "No more data...",
        };
      });
      return;
    }

    if (nfts?.data?.data.length >= 12) {
      setMoreButton(true);
    }

    setSkip(skip + 12);
    let oldData = nftData;
    let newData = nfts?.data?.data;
    let finalData = [...oldData, ...newData];
    setNftData(finalData);

    if (!nfts) {
      return;
    }
  };

  React.useEffect(() => {
    if (token) getFavoriteNftsData(token, publicAddress, skip);
  }, [token]);

  React.useEffect(() => {
    if (disabled.toggle === true) {
      setTimeout(() => {
        setDisabled((prev) => {
          return {
            ...prev,
            msg: "",
          };
        });
      }, 2000);
    }
  }, [disabled.toggle]);

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          boxShadow: (theme) => ({
            xs: 0,
          }),
          maxWidth: "1300px",
          mt: "70px",
          height: "auto",
        }}
      >
        <Grid container spacing={3}>
          {nftData && nftData.length > 0 ? (
            nftData?.map((value, index) => {
              let nft = value?.nft;
              // let owners = nft?.nft_owners[nft?.nft_owners?.length - 1];
              let nftLikes = value?.likes;
              let owner = null;
              if (value?.contract_type === ERC_721) {
                owner = value?.nft?.nft_owners[0];
              } else {
                console.log(value);
                let reverseArray = value?.nft?.nft_owners; //reverse(); Removed reverse array function
                if (reverseArray && reverseArray.length > 1) {
                  for (const element of reverseArray) {
                    if (element?.put_on_sale) {
                      owner = element;
                      break;
                    }
                  }
                } else {
                  owner = value?.nft?.nft_owners[0];
                }
              }
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <NFT
                    nftId={nft?._id}
                    linkKey={nft?._id}
                    src={
                      process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                      nft?.profile_image
                    }
                    imageType={nft?.image_type}
                    name={nft?.nft_name}
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

        {moreButton ? (
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
              {disabled.toggle ? (
                <Box>{disabled.msg}</Box>
              ) : (
                <Link
                  onClick={() => getOwnedNfts(skip)}
                  underline="always"
                  color="inherit"
                  sx={{ color: theme.palette.brandpurple.primary }}
                >
                  Load More
                </Link>
              )}
            </Typography>
          </Box>
        ) : null}
      </Container>
    </>
  );
}

export default Favourites;
