import { Card, Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "../../Image";
import NextLink from "next/link";
// routes
import Routes from "src/routes";

const RootStyle = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
}));

function ContainedImageCard({
  src,
  alt,
  minHeight,
  description,
  name,
  nftId,
  linkKey,
  ...props
}) {
  return (
    <RootStyle>
      <Card className="noteable-nft">
        <Box
          className="container"
          sx={{ borderRadius: 1.5, width: "100%", height: "426px" }}
        >
          <Box className="top">
            <Typography variant="h3" noWrap sx={{ maxWidth: "200px" }}>
              {name}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                maxWidth: "303px",
                height: "auto",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "7",
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </Typography>
          </Box>
          <Box sx={{ height: "100%" }}>
            <Image className="image" src={src} alt={alt} {...props} />
          </Box>
          <Box className="middle">
            <NextLink href={`${Routes.nfts}/${linkKey}`} key={linkKey}>
              <a style={{textDecoration: "none", color:"inherit"}}>
              
              <Button variant="containedInherit" size="medium">
                Explore Now
              </Button>
              </a>
            </NextLink>
          </Box>
        </Box>
      </Card>
    </RootStyle>
  );
}

export default ContainedImageCard;
