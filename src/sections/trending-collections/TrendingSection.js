import React from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { Container, Card, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Image } from "../../components";
import { TrendingCard } from "../../components/trending-collections";
import Routes from "src/routes";
import { GetTrendingCollctions } from "../../apis";
import NextLink from "next/link";
import ReactHtmlParser from "react-html-parser";
import { queryParamFormatter } from "../../utils/queryStringFormetter";

function TrendingSection() {
  const [collections, setCollections] = React.useState([]);

  const getCollectionData = async () => {
    const payload = {
      skip: "0",
      limit: "5",
      views: "desc",
      likes: "desc",
    };
    const dataResult = await GetTrendingCollctions(
      queryParamFormatter(payload)
    );
    if (dataResult?.data?.data?.length > 0) {
      setCollections(dataResult?.data?.data);
    } else {
      return;
    }
  };

  React.useEffect(() => {
    getCollectionData();
  }, []);

  const theme = useTheme();
  return (
    <Box className="background-grad" sx={{ width: "100%", mt: "100px" }}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1300px",
          pt: "84px",
          pb: "76px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                width: "363px",
                maxHeight: "424px",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  color: "white",
                  marginTop: 3,
                }}
              >
                Trending<br></br>Collections
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  color: "white",
                  marginTop: 1,
                  marginBottom: 2,
                  marginRight: 4,
                }}
              >
                DStage is the world's first and largest Asian NFT marketplace.
                You can create your storefront and create your nfts and your own
                collections.
              </Typography>

              <NextLink href={Routes.exploreCollections}>
                <a style={{ textDecoration: "none" }}>
                  <Button
                    variant="containedInherit"
                    target="_blank"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      minWidth: "176px",
                      marginTop: 4,
                    }}
                  >
                    View All Collections
                  </Button>
                </a>
              </NextLink>
            </Box>
          </Grid>

          {collections && collections.length > 0 ? (
            collections?.map((value, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <TrendingCard
                  value={value?._id}
                  src={
                    process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                    value?.profile_cover
                  }
                  headingText={value?.collection_name}
                  bodyText={ReactHtmlParser(value?.description)}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sm={6}>
              <Box
                display="flex"
                justifyContent={{ xs: "center", md: "flex-end" }}
                alignItems={{ xs: "center", md: "flex-end" }}
              >
                <Image
                  alt="cover"
                  src="/assets/images/svgs/noData-white.svg"
                  sx={{
                    mt: 4,
                    width: "270px",
                    height: "auto",
                  }}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default TrendingSection;
