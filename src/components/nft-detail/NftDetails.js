import React, { useState, useEffect } from "react";
import { AvatarDetailed, CustomChip } from "../shared";
import { useAppContext } from "src/context-api/appContext";
//mui
import { Grid, Divider, Typography } from "@mui/material";

export default function NftDetails() {
  const { state } = useAppContext();
  const [nftDataProperties, setNftDataProperties] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (state.nftData) {
      setNftDataProperties(state.nftData?.properties);
      setData(state.nftData);
    }
  }, [state.nftData]);
  return (
    <Grid container p={5}>
      <Grid item xs={12} sm={6}>
        <AvatarDetailed
          title="Creator"
          subtitle={`(${data?.royalties}% royalties)`}
          src={
            data?.nft_creator?.profileImage
              ? process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                data?.nft_creator?.profileImage
              : "/assets/images/svgs/profileDp.svg"
          }
          avatarText={data?.nft_creator?.publicAddress}
          isSlice={true}
          isLight={true}
          opacity={true}
          link={`/profile/${data?.nft_creator?.publicAddress}`}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AvatarDetailed
          title="Collections"
          src={
            data?.collection?.profile_image
              ? process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                data?.collection?.profile_image
              : "/assets/images/svgs/avatar1.svg"
          }
          avatarText={data?.collection?.collection_name}
          isSlice={false}
          isLight={true}
          opacity={true}
          link={`/collection-detail/${data?.collection?._id}`}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ height: 24, mt: 2, mb: 4 }} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <AvatarDetailed
          title="Blockchain"
          src="/assets/images/svgs/etherum-light.svg"
          avatarText={data?.block_chain}
          isLight={false}
          opacity={false}
          isColored={true}
          link="#"
        />
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ height: 24, mt: 2, mb: 4 }} />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {nftDataProperties?.length && nftDataProperties?.length > 0 ? (
            <Grid item xs={12}>
              <Typography variant="h5" pr={1}>
                Properties
              </Typography>
            </Grid>
          ) : (
            ""
          )}
          {nftDataProperties?.length && nftDataProperties?.length > 0
            ? nftDataProperties?.map((data, index) => {
                return (
                  <Grid item key={index}>
                    <CustomChip
                      isDelete
                      title={data?.name}
                      value={data?.type}
                    />
                  </Grid>
                );
              })
            : ""}
        </Grid>
      </Grid>
    </Grid>
  );
}
