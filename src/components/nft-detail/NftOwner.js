import React, { useState, useEffect } from "react";
import { AvatarTypo } from "../shared";
import { useAppContext } from "src/context-api/appContext";
//mui
import { Grid, Divider, Box } from "@mui/material";
import { getOwnerByNftId } from "../../apis";
export default function NftOwner() {
  const { state } = useAppContext();
  const [owner, setOwner] = useState(null);
  useEffect(async () => {
    if (state?.nftData) {
      const data = await getOwnerByNftId(state?.nftData?._id);
      if (data) {
        const arrayData = data?.data?.data;
        setOwner(arrayData);
      }
    }
  }, [state?.nftData]);
  return (
    <Grid container p={5} className="scrollBar" maxHeight={"540px"}>
      {owner?.ownersArray &&
        owner?.ownersArray.length > 0 &&
        owner?.ownersArray.map((data, index) => {
          console.log(data);
          return (
            <Box width="100%" key={index}>
              <Grid item xs={12}>
                <AvatarTypo
                  src={
                    data?.user_data[0]?.profileImage
                      ? process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                        data?.user_data[0]?.profileImage
                      : "/assets/images/svgs/profileDp.svg"
                  }
                  text={data?.user_data[0].publicAddress}
                  slice={false}
                  isLight={true}
                  opacity={true}
                  isColored={false}
                  link={`/profile/${data?.user_data[0].publicAddress}`}
                />
              </Grid>
              <Grid>
                <Divider sx={{ height: 24, mt: 2, mb: 4 }} />
              </Grid>
            </Box>
          );
        })}
    </Grid>
  );
}
