import React from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  Button,
  Link,
} from "@mui/material";
import NextLink from "next/link";
import {
  TrandingNft,
  DropDownSaleType,
  DropDownMarks,
} from "../../components/shared";
import { useTheme } from "@mui/material/styles";
import Routes from "src/routes";
import { useAppContext } from "../../context-api/appContext";

export default function ExoloreNftHeader({ heading, subHeading }) {
  const { dispatch, state } = useAppContext();
  const [categories, setCategories] = React.useState(null);
  React.useEffect(() => {
    if (state?.categories.length > 0) {
      let result = state?.categories.map((a) => a.category_name);
      let sortedResult = result.sort();
      setCategories(sortedResult);
    }
  }, [state?.categories]);
  // const [checked, setChecked] = React.useState([]);

  const theme = useTheme();
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          boxShadow: (theme) => ({
            xs: 0,
          }),
          maxWidth: "1300px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: { md: "center" },
            maxWidth: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },

              // alignItems: {xs:'flex-start', md:"center"},

              // mt: { xs: 18, md: 0 },
            }}
          >
            <Box
              sx={{
                mr: { xs: "0px", md: "48px" },
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: theme.palette.brandblack.primary,
                  fontSize: { sm: 26, md: 30, lg: 32 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {heading}
              </Typography>
            </Box>

            <Box
              sx={{
                maxWidth: "100%",
                pt: { xs: 2, md: 0 },

                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { md: "center" },
              }}
            >
              <Box sx={{ pb: { xs: 2, md: 0 }, mr: { xs: 0, md: 2 } }}>
                <DropDownMarks
                  isIcon={true}
                  src="/assets/images/svgs/select.svg"
                  text="Select Category"
                  data={categories}
                />
              </Box>
              <Box>
                <DropDownSaleType
                  isIcon={true}
                  src="/assets/images/svgs/sale.svg"
                  text="Sale Type"
                  data={[
                    { name: "On Auction", keyValue: "auction" },
                    {
                      keyValue: "notOnSale",
                      name: "Not for Sale",
                    },
                    { keyValue: "hasOffer", name: "Offer" },
                    { keyValue: "onSale", name: "On Sale" },
                    { keyValue: "price", name: "Price" },
                  ]}
                />
              </Box>

              <Box
                className=""
                sx={{ pb: { xs: 2, md: 0 }, ml: { xs: 0, md: 2 } }}
              >
                <Button
                  onClick={() => {
                    dispatch({ type: "CLEAR_ALL", value: true });
                    dispatch({ type: "SALE_FILTER", value: [] });
                    dispatch({ type: "APPLY_FILTER", value: [] });
                  }}
                  variant="containedInherit"
                  target="_blank"
                  sx={{
                    marginBlock: 2,
                    minHeight: 46.2,
                  }}
                >
                  Clear All
                </Button>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: { xs: 0.5, md: 0 } }}>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.brandblack.primary,
                // fontSize: { xs: 16, sm: 20, md: 24, lg: 24 },
              }}
            >
              <NextLink href={Routes.nfts}>
                <Link
                  onClick={() => {
                    dispatch({ type: "APPLY_FILTER", value: [] });
                    dispatch({ type: "PROFILE_NFTS", value: [] });
                  }}
                  underline="always"
                  color="inherit"
                  sx={{ color: theme.palette.brandblack.primary }}
                >
                  {subHeading}
                </Link>
              </NextLink>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}
