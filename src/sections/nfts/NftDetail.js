import React, { useEffect, useState } from "react";

// mui
import { Container, Grid, Box } from "@mui/material";

// Image
import { Image } from "../../components";
import { NftDetailMain } from "src/components/nft-detail";
import { useAppContext } from "src/context-api/appContext";

import "/node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";

export default function NftDetail() {
  const { state } = useAppContext();
  const { userData } = state;
  const [data, setData] = useState(null);
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (state.nftData) {
      setData(state.nftData);
      setUrl(
        process.env.NEXT_PUBLIC_PINATA_BASE_URL + state.nftData?.profile_image
      );
    }
  }, [state.nftData, userData]);

  return (
    <Container
      maxWidth={false}
      sx={{
        boxShadow: (theme) => ({
          xs: 0,
        }),
        maxWidth: "1300px",
        pt: "160px",
      }}
    >
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              maxHeight: { xs: 400, sm: 550, md: 686 },
              borderRadius: 1,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {url && data?.image_type === "image" ? (
              <Image src={url} />
            ) : data?.image_type === "video" ? (
              <Player
                playsInline
                src={url}
                fluid={false}
                width={480}
                height={272}
              />
            ) : null}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <NftDetailMain />
        </Grid>
      </Grid>
    </Container>
  );
}
