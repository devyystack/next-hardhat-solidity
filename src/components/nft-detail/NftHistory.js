import React, { useState, useEffect } from "react";
import { useAppContext } from "src/context-api/appContext";

//mui
import { Grid, Divider, Box } from "@mui/material";

import { AvatarHistoryBids } from "../shared";
import { getAllActivitiesWithOwnerByNftId } from "../../apis";
import { converter } from "src/utils/ethConverter";

export default function NftHistory() {
  const { state } = useAppContext();
  const { userData } = state;
  const [activities, setActivities] = useState(null);
  // Set Activities
  useEffect(async () => {
    if (state?.nftData) {
      const result = await getAllActivitiesWithOwnerByNftId(
        state?.nftData?._id
      );
      setActivities(result?.data?.data);
    }
  }, [state.nftData, userData]);
  return (
    <Grid container p={5} className="scrollBar" maxHeight={"540px"}>
      {activities && activities.length
        ? activities.map((data, index) => {
            console.log(data);
            return (
              <Box key={index} width="100%">
                <Grid item xs={12}>
                  <AvatarHistoryBids
                    src={
                      data?.owner[0]?.profileImage
                        ? process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                          data?.owner[0]?.profileImage
                        : "/assets/images/svgs/profileDp.svg"
                    }
                    price={
                      data?.nft_price
                        ? converter(data?.nft_price, "wei", "eth")
                        : ""
                    }
                    currencyType={data?.nft[0]?.currency_type}
                    ownerName={data?.owner[0]?.userName}
                    time={data?.createdAt}
                    index={index}
                    opacity
                    slice
                    bid={false}
                    link={`/profile/${data?.owner[0]?.publicAddress}`}
                    hash={data?.transaction_hash ? data?.transaction_hash : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ height: 24, mt: 2, mb: 4 }} />
                </Grid>
              </Box>
            );
          })
        : "History not found!"}
    </Grid>
  );
}
