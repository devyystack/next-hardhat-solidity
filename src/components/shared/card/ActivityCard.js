import { Card, Button, Box, Typography, Grid, Link } from "@mui/material";

import Image from "../../Image";
import AvatarTypo from "../avatarWithText/AvatarTypo";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useTheme } from "@mui/material/styles";
import SocialGroup from "../SocialGroup";
import OnSale from "../OnSale";
import PriceSection from "../PriceSection";
import Routes from "src/routes";
import NextLink from "next/link";

function ActivityCard({
  src,
  text,
  price,
  collectionName,
  isOnSale,
  eth_price,
  nftId,
  linkKey,
  onSale
}) {
  const theme = useTheme();
console.log(text,
  price,
  collectionName,
  isOnSale,
  eth_price,onSale);
  return (
    <>
      <Card
        className="activity-card"
        sx={{
          borderColor: "grey.400",
          width: "100%",
          pt: { xs: "6px", sm: "0px" },
          pb: { xs: "6px", sm: "0px" },
          ml: { xs: "0px", lg: "88px" },
        }}
      >
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={4}>
            <AvatarTypo
              alt="avatar"
              src={src}
              text={text}
              link={`${Routes.nfts}/${linkKey}`}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={2}
            pt={{ xs: 1, sm: 0 }}
            pl={{ xs: 8, md: 0 }}
          >
            <Box>{onSale &&
              <PriceSection text={eth_price === null ? "" : price} />}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            pt={{ xs: 1, md: 0 }}
            pl={{ xs: 8, md: 0 }}
          >
            <Box noWrap>
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                }}
                variant="h5Light"
              >
                {collectionName ? collectionName : "Untitled Collection"}
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            pt={{ xs: 1, md: 0 }}
            pl={{ xs: 8, md: 0 }}
          >
            {isOnSale ? (
              <Box display="flex" alignItems="center" justifyContent="left">
                <OnSale
                  text="On Sale"
                  textStyle={!onSale}
                  nft={false}
                />
                <NextLink href={`${Routes.nfts}/${linkKey}`} key={linkKey}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, ml: 5, cursor: "pointer" }}
                  >
                    Details
                  </Typography>
                </NextLink>
              </Box>
            ) : (
              <Box>
                <Link href="#" sx={{ color: theme.palette.linkblue.primary }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Visit on website
                  </Typography>
                </Link>
              </Box>
            )}
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default ActivityCard;
