import React, { useState, useEffect } from "react";

// mui
import { Grid, Typography, Box } from "@mui/material";
import { LikesSection, ViewsSection, CustomMenu } from "../shared";
import { Image } from "../../components";
import dynamic from "next/dynamic";
const DynamicComponentWithNoSSR = dynamic(
  () => import("../modal/CustomizedDialogs"),
  { ssr: false }
);
import { useAppContext } from "src/context-api/appContext";
export default function NftDetailHeading() {
  const { state } = useAppContext();
  const { userData } = state;
  const [data, setData] = useState(null);
  useEffect(() => {
    if (state.nftData) setData(state.nftData);
  }, [state.nftData, userData]);
  const [anchorEl, setAnchorEl] = useState(null);
  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  /**********Modal Settings */
  const [openModal, setOpenModal] = useState(false);
  const handleModalClickOpen = () => {
    setOpenModal(true);
  };
  const handleModalClickClose = () => {
    setOpenModal(false);
  };

  const menuData = [
    {
      title: "Report NFT",
      src: "/assets/images/svgs/info.svg",
    },
    {
      title: "Share this NFT",
      path: "#",
      src: "/assets/images/svgs/share.svg",
    },
  ];
  return (
    <Grid container>
      <Grid
        item
        xs={6}
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography variant="h5" width="100%" noWrap>
          {data?.nft_name}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Grid
          container
          display="flex"
          justifyContent="flex-end"
          spacing={0}
          alignItems="center"
        >
          <Grid item mr={2}>
            <ViewsSection
              src="/assets/images/svgs/view.svg"
              views={data?.views_count}
              nftId={data?._id}
            />
          </Grid>
          <Grid item>
            <LikesSection
              src="/assets/images/svgs/heart.svg"
              nftLikes={data?.likes}
              nftId={data?._id}
              // bg
            />
          </Grid>
          {/* <Grid item>
            <Box display="flex" alignItems={"center"} justifyContent="flex-end">
              <Image
                src="/assets/images/svgs/morevert.svg"
                onClick={handleClick}
              ></Image>
              <CustomMenu
                anchorEl={anchorEl}
                handleClose={handleClose}
                data={menuData}
                handleOpen={handleModalClickOpen}
              />
              <DynamicComponentWithNoSSR
                openModal={openModal}
                handleModalClickClose={handleModalClickClose}
              />
            </Box>
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
}
