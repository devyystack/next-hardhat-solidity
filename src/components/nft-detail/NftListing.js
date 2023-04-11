import React, { useState, useEffect } from "react";
import { useAppContext } from "src/context-api/appContext";
//mui
import { Button, Grid, Divider, Box } from "@mui/material";
import jwt_decode from "jwt-decode";
import { getUserCookie } from "../../utils/getCookies";
import { toast } from "react-toastify";
import { AvatarListing } from "../shared";
import { getListings } from "../../apis";
import { converter } from "src/utils/ethConverter";
import { ERC_721, ERC_1155 } from "src/config";
import { BuyNftModal, DisclaimerModal } from "../../components";

export default function NftListing() {
  const token = getUserCookie();
  const { state, dispatch } = useAppContext();
  const [listings, setListings] = useState(null);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openDisclaimerModal, setOpenDisclaimerModal] = useState(false);

  const handleDisclaimerModalClickOpen = () => {
    setOpenDisclaimerModal(true);
  };
  const handleDisclaimerModalClose = () => {
    setOpenDisclaimerModal(false);
  };
  const handleBuyModalClose = () => {
    setOpenBuyModal(false);
  };
  const handleBuyModalClickOpen = () => {
    setOpenBuyModal(true);
  };
  const handleBuyClickOpen = (address) => {
    if (token) {
      const decoded = jwt_decode(token);
      const userAddress = decoded.publicAddress.toLowerCase();
      if (
        state?.nftData?.free_mint === true &&
        state?.nftData?.creator_address.toLowerCase() === userAddress
      ) {
        return toast.error("You are not authorized", {
          autoClose: 1500,
        });
      }
    }
    dispatch({ type: "NFT_OWNER", value: address });
    if (
      address.toLowerCase() === state?.nftData?.creator_address.toLowerCase() &&
      state?.nftData?.free_mint === true
    ) {
      handleDisclaimerModalClickOpen();
    } else {
      handleBuyModalClickOpen();
    }
  };
  // Set listings
  useEffect(async () => {
    if (state?.nftData) {
      if (state?.nftData?.contract_type === ERC_1155) {
        const result = await getListings(state?.nftData?._id);
        setListings(result?.data?.data);
      } else {
        setListings([]);
      }
    }
  }, [state?.nftData]);

  return (
    <>
      <Grid container p={5} className="scrollBar" maxHeight={"540px"}>
        {listings && listings.length ? (
          listings.map((data, index) => {
            return (
              <Box key={index} width="100%">
                <Grid item xs={12} width="100%">
                  <AvatarListing
                    src={
                      data?.user_data[0]?.profileImage
                        ? process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                          data?.user_data[0]?.profileImage
                        : "/assets/images/svgs/avatar1.svg"
                    }
                    price={
                      data?.nft_price
                        ? converter(data?.nft_price, "wei", "eth")
                        : ""
                    }
                    copies={data?.copies}
                    ownerName={data?.user_data[0]?.userName}
                    address={data?.user_data[0]?.publicAddress}
                    opacity={true}
                    link={`/profile/${data?.user_data[0].publicAddress}`}
                    putOnSale={data?.put_on_sale}
                    onClick={() =>
                      handleBuyClickOpen(data?.user_data[0]?.publicAddress)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ height: 24, mt: 2, mb: 4 }} />
                </Grid>
              </Box>
            );
          })
        ) : (
          <b>No listings available yet!</b>
        )}
      </Grid>
      <BuyNftModal
        openSuccessModal={openBuyModal}
        handleSuccessModalClose={handleBuyModalClose}
      />
      <DisclaimerModal
        openSuccessModal={openDisclaimerModal}
        handleSuccessModalClose={handleDisclaimerModalClose}
        buyModal={handleBuyModalClickOpen}
      />
    </>
  );
}
