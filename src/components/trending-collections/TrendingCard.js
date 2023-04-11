import { Box } from "@mui/system";
import { Card, Typography, Button, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Image } from "../../components";
import NextLink from "next/link";
import React from "react";
import Routes from "src/routes";

function TrendingCard({ src, headingText, bodyText, value }) {
  const theme = useTheme();
  const [description, setDescription] = React.useState("");
  React.useEffect(() => {
    if (bodyText) setDescription(bodyText);
  }, [bodyText]);
  return (
    <Card className="trending-card">
      <Box
        sx={{
          width: "363px",
          height: "225px",
        }}
      >
        <Image
          alt="cover"
          src={src}
          sx={{
            cursor: "pointer",
            width: "363px",
            height: "225px",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          textAlign: "center",
        }}
      >
        <Typography
          noWrap
          variant="h6"
          sx={{
            color: "white",
            marginTop: 2,
            marginRight: 1,
            marginLeft: 1,
          }}
        >
          {headingText}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            height: 48,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            color: "white",
            marginTop: 1,
            marginRight: 3,
            marginLeft: 3,
          }}
        >
          {description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            text: "white",
            marginTop: 3,
            marginBottom: 4,
          }}
        >
          <NextLink
            href={`${Routes.collectionProfile}/${value}`}
            color="inherit"
          >
            <a style={{ textDecoration: "none" }}>
              <Button
                variant="outlinedInherit2"
                sx={{
                  width: 290,
                  maxWidth: 290,
                  height: 43,
                  textAlign: "center",
                  border: "2px solid #FFFFFF",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "center",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Explore
                </Typography>
              </Button>
            </a>
          </NextLink>
        </Box>
      </Box>
    </Card>
  );
}
export default TrendingCard;
