import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { Container, Card, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import chevronDown from "@iconify/icons-carbon/chevron-down";
import { CustomMenu } from "../../components/shared";
import chevronUp from "@iconify/icons-carbon/chevron-up";
import { Iconify } from "../../components";
import { ViewsSection, PriceSection, CardHeading, AvatarTypo } from "../shared";
import React, { useState } from "react";
import { converter } from "../../utils/ethConverter";
import { Image } from "../../components";
import { GetAllBids } from "../../apis";
import { useQuery } from "react-query";
import NextLink from "next/link";
import Routes from "src/routes";
import { useAppContext } from "../../context-api/appContext";

const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    paddingTop: 0,
  },
}));

export default function HottestBids() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [bids, setBids] = useState([]);
  const [time, setTime] = useState("");

  const { state } = useAppContext();

  function handleClickOpenChevron(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleCloseChevron() {
    setAnchorEl(null);
  }

  const dataHandel = [
    { title: "24 Hours", value: 24 },
    { title: "7 days", value: 7 },
    { title: "Month", value: 1 },
    { title: "All", value: "" },
  ];

  const handleClick = () => {
    console.log("clicked");
  };

  const getHottestBidsData = async (time) => {
    const result = await GetAllBids(time);
    if (result?.data?.data) {
      setBids(result?.data?.data);
    }
  };

  React.useEffect(() => {
    getHottestBidsData(time);
  }, [time]);

  // ************************************
  React.useEffect(() => {
    getHottestBidsData(state.bidsFilter);
    setTime(state.bidsFilter);
  }, [state.bidsFilter, state.bidsTime]);

  const theme = useTheme();
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1300px",
        pt: "100px",
      }}
    >
      <Box
        sx={{
          width: "auto",
          height: "auto",
          justifyContent: "center",
          display: "flex",
          overflow: "hidden",
          alignItems: "center",
          marginBottom: "59px !important",
        }}
      >
        <CardHeading text="Hottest Bids over last">
          <Box
            component="span"
            sx={{ color: theme.palette.brandpurple.primary }}
          >
            &nbsp;{state.bidsTime}
          </Box>

          <Iconify
            icon={Boolean(anchorEl) ? chevronUp : chevronDown}
            sx={{
              ml: 1,
              width: 27,
              height: 27,
            }}
            onClick={handleClickOpenChevron}
            // onMouseOver={handleClickOpenChevron}
          />
          <CustomMenu
            anchorEl={anchorEl}
            handleClose={handleCloseChevron}
            data={dataHandel}
            handleOpen={handleClickOpenChevron}
            onClick={handleClick}
          />
        </CardHeading>
      </Box>

      <Grid container spacing={3}>
        {bids && bids.length > 0 ? (
          bids?.map((value, index) => {
            let bids = value?.bids[value?.bids?.length - 1];
            let owner = value?.nft_owners[value?.nft_owners?.length - 1];
            let linkKey = value?._id;
            return (
              <Grid
                key={index}
                item
                xs={12}
                md={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Card
                  className="bids-card"
                  sx={{
                    borderColor: "grey.400",
                    width: "100%",
                  }}
                >
                  <Grid container>
                    <Grid item xs={8} sm={6}>
                      <AvatarTypo
                        link={`${Routes.nfts}/${linkKey}`}
                        //linkKey={linkKey}
                        src={
                          value?.image_type === "video"
                            ? "/assets/images/svgs/video.svg"
                            : process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                              value?.profile_image
                        }
                        text={value?.nft_name}
                      />
                    </Grid>
                    <Grid item xs={4} sm={6}>
                      <Box
                        height="100%"
                        sx={{
                          display: { sm: "flex" },
                          justifyContent: { sm: "space-evenly" },
                        }}
                      >
                        <ViewsSection
                          src="/assets/images/svgs/view.svg"
                          // text="(405k)"
                          text={value?.views_count}
                          nftId={value?._id}
                          size
                        />
                        <PriceSection
                          src="/assets/images/svgs/fireIcon.svg"
                          text={
                            owner
                              ? converter(owner?.nft_price, "wei", "eth")
                              : ""
                          }
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Box display="flex" justifyContent="center" width="100%">
            <Image
              alt="cover"
              src="/assets/images/svgs/noData.svg"
              sx={{
                width: "270px",
                height: "auto",
              }}
            />
          </Box>
        )}
      </Grid>
    </Container>
  );
}
