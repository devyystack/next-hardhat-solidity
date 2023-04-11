import React, { useRef } from "react";
import Slider from "react-slick";
import { m } from "framer-motion";
// next

// @mui
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Container, Typography } from "@mui/material";

//
import { Image, CarouselDots, CarouselArrows } from "../../components";
import { CardHeading } from "../../components/shared";

import { GetAllNfts } from "../../apis";
import { useQuery } from "react-query";
import { queryParamFormatter } from "../../utils/queryStringFormetter";

import NextLink from "next/link";
// routes
import Routes from "src/routes";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function CustomSlider() {
  const [sliderData, setSliderData] = React.useState([]);

  const getAllNftsData = async () => {
    const payload = {
      limit: "5",
      likes: "desc",
      skip: "0",
      video: "false",
    };
    const result = await GetAllNfts(queryParamFormatter(payload));

    if (result?.data?.data?.length > 0) {
      setSliderData(result?.data?.data);
    }

    if (!result) {
      return;
    }
  };

  React.useEffect(() => {
    getAllNftsData();
  }, []);

  const theme = useTheme();

  const carouselRef = useRef(null);

  const carouselSettings = {
    // arrows: false,
    // dots: true,
    // infinite: false,
    // slidesToShow: 4,
    // slidesToScroll: 1,
    // rtl: Boolean(theme.direction === 'rtl'),
    // ...CarouselDots(),

    // centerMode: true, // - (Gilad, 20.2.17) - we wanted it but it doesn't work for some reason...
    // draggable: true,
    // speed: 500,
    // slidesToShow: 3, //changes on responsive
    // slidesToScroll: 1,
    // responsive: [{ breakpoint: 500, settings: { autoplay: true, slidesToShow: 1 } }],
    // dots: true,
    //...CarouselDots(),
    infinite: true,
    autoplaySpeed: 5000,
    autoplay: true,
    arrows: true,
    // centerPadding: '60px',
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    dots: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1300px",
        pt: "150px",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              width: "100%",
              height: "auto",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              marginBottom: "59px !important",
              padding: {
                md: "0px 20px",
                lg: "0px 40px",
              },
            }}
          >
            <Typography
              variant="topHeading"
              sx={{ color: theme.palette.brandblack.primary }}
            >
              List all NFTs for Free.
              <Box sx={{ fontWeight: 400, fontSize: { sm: 20, lg: 24 } }}>
                Lazy Mint. Lowest trade fee.
              </Box>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            {sliderData.length > 2 ? (
              <Slider ref={carouselRef} {...carouselSettings}>
                {sliderData &&
                  sliderData.length > 2 &&
                  sliderData?.map((value, index) => {
                    let linkKey = value?._id;
                    return (
                      <NextLink
                        href={`${Routes.nfts}/${linkKey}`}
                        key={linkKey}
                      >
                        <a>
                          <Box
                            component={m.a}
                            sx={{ borderRadius: 1.5 }}
                            key={index}
                          >
                            <Image
                              alt="cover"
                              src={
                                process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                                value?.profile_image
                              }
                              sx={{
                                borderRadius: 1.5,
                                cursor: "pointer",
                                "&:hover": { opacity: 0.8 },
                                maxWidth: 410,
                                height: 390,
                              }}
                            />
                          </Box>
                        </a>
                      </NextLink>
                    );
                  })}
              </Slider>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  alt="cover"
                  src="/assets/images/svgs/noData.svg"
                  sx={{
                    mt: 4,
                    width: "270px",
                    height: "auto",
                  }}
                />
              </Box>
            )}

            {sliderData.length > 2 && (
              <CarouselArrows
                onNext={handleNext}
                onPrevious={handlePrevious}
                sx={{
                  top: -10,
                  position: "relative",
                  justifyContent: "flex-end",
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
