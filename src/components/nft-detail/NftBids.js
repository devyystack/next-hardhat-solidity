import React, { useState, useEffect } from "react";
import { useAppContext } from "src/context-api/appContext";
//mui
import { Grid, Divider, Box } from "@mui/material";

import { AvatarHistoryBids } from "../shared";
import { getBidsByNftId } from "../../apis";
import { converter } from "src/utils/ethConverter";
export default function NftBids() {
  const { state } = useAppContext();
  const [bids, setBids] = useState(null);
  // Set Activities
  useEffect(async () => {
    if (state?.nftData) {
      const ownerData = state?.nftData?.nft_owners[0];
      let nftId = state?.nftData?._id;
      let ownerAddress = ownerData?.owner_address;
      const result = await getBidsByNftId(nftId, ownerAddress);
      setBids(result?.data?.data);
    }
  }, [state.nftData]);

  return (
    <Grid container p={5} className="scrollBar" maxHeight={"540px"}>
      {bids && bids.length > 0 ? (
        bids.map((data, index) => {
          return (
            <Box key={index} width="100%">
              <Grid item xs={12}>
                <AvatarHistoryBids
                  src={
                    data && data?.users_details[0]?.profileImage
                      ? process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                        data?.users_details[0]?.profileImage
                      : "/assets/images/svgs/profileDp.svg"
                  }
                  title={"Bid of"}
                  price={
                    data?.bid_price && converter(data?.bid_price, "wei", "eth")
                  }
                  currencyType={data?.nft?.currency_type}
                  ownerName={data?.users_details[0]?.userName}
                  bodyText={data?.bidder_address}
                  time={data?.createdAt}
                  opacity
                  slice
                  bid={true}
                  link={`/profile/${data?.bidder_address}`}
                  hash={data?.bid_transaction ? data?.bid_transaction : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ height: 24, mt: 2, mb: 4 }} />
              </Grid>
            </Box>
          );
        })
      ) : (
        <b>No bids yet!</b>
      )}
    </Grid>
  );
}
