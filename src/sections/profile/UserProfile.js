import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import { getUserData } from "../../users/getUserData";
import jwt_decode from "jwt-decode";

import {
  Container,
  Typography,
  Link,
  Avatar,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Image } from "../../components";
import CustomeTabs from "../../components/shared/tabs/CustomeTabs";
import OnSale from "./OnSale";
import Owned from "./Owned";
import Created from "./Created";
import Activity from "./Activity";
import Collections from "./Collections";
import Favourites from "./Favourites";
import NextLink from "next/link";
import { SocialGroup } from "../../components/shared";
import Routes from "src/routes";
import { useAppContext } from "src/context-api/appContext";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getSessionData } from "../../utils/getSession";
import { getUserCookie } from "../../utils/getCookies";
import { removeCookies } from "../../utils/removeCookies";

import { GetActivity, GetAllNft } from "../../apis";

export default function UserProfile({ data, id }) {
  // console.log("data in user profile", data);
  const router = useRouter();
  const [wallet, setWallet] = useState("");
  const [decodedAddress, setDecodedAddress] = useState("");
  const { state } = useAppContext();
  const { userData } = state;
  const token = getUserCookie();

  // useEffect(() => {
  //   if (token) {
  //     var decoded = jwt_decode(token);
  //     const address = decoded.publicAddress;
  //     setDecodedAddress(address);
  //   }
  // }, [token]);

  useEffect(() => {
    if (token) {
      const walletAddress = id;
      setWallet(walletAddress);

      let decoded = jwt_decode(token);
      const loginAddress = decoded.publicAddress;
      setDecodedAddress(loginAddress);
    }
  }, [token]);
  const { dispatch } = useAppContext();

  const lists = [
    { text: "On Sale", src: "/assets/images/svgs/onsale.svg" },
    { text: "Owned", src: "/assets/images/svgs/owned.svg" },
    { text: "Created", src: "/assets/images/svgs/created.svg" },
    { text: "Collections", src: "/assets/images/svgs/collection.svg" },
    { text: "Favorites", src: "/assets/images/svgs/favourite.svg" },
    { text: "Activity", src: "/assets/images/svgs/activity.svg" },
  ];

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const [profileData, setProfileData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  // const { data, isLoading } = useQuery("data", getUserData);
  const [loading, setLoading] = useState(true);

  const handleChange = async (event, newValue) => {
    dispatch({ type: "APPLY_FILTER", value: [] });
    dispatch({ type: "PROFILE_NFTS", value: [] });
    // dispatch({ type: "PRICE_FILTER", value: {min:0,max:0}});
    setValue(newValue);
  };

  useEffect(async () => {
    if (data) {
      setLoading(false);
      setProfileData(data);
      dispatch({ type: "USER_DESC", value: data?.description });
      dispatch({ type: "USER_PROFILE", value: data });
    }
  }, [data]);

  useEffect(() => {
    if (wallet !== "") {
      if (userData) {
        setLoading(false);
        if (userData?.data?.data) {
          router.push("/");
          setProfileData(userData?.data?.data);
        } else {
          router.push("/");
          setProfileData(userData?.data);
        }
      }
    }
  }, [userData]);

  return (
    <>
      <Box
        sx={{
          maxHeight: "308px",
          minHeight: { xs: "0px", lg: "308px" },
          maxWidth: "100%",
          overflow: "hidden",
          mt: { xs: 10, md: 12 },
        }}
      >
        {profileData?.profileCover !== "" ? (
          loading ? (
            <Skeleton variant="rectangular" width="100%" height={308} />
          ) : (
            <Image
              component="img"
              className="img-render-fix"
              loading="lazy"
              alt="cover"
              src={
                process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                profileData?.profileCover
              }
            />
          )
        ) : (
          <Image
            className="img-render-fix"
            loading="lazy"
            alt="cover"
            src="/assets/images/svgs/profileUser.jpg"
          />
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "left" },
          position: "relative",
          bottom: { xs: "65px", sm: "130px" },
        }}
      >
        {profileData?.profileImage !== "" ? (
          // (loading ? <Skeleton variant="circular" width="auto" height="auto"/> :
          <Avatar
            alt="profile"
            loading="lazy"
            src={
              process.env.NEXT_PUBLIC_PINATA_BASE_URL +
              profileData?.profileImage
            }
            sx={{
              width: { xs: "120px", sm: "248px" },
              height: { xs: "120px", sm: "248px" },

              left: { xs: "0", md: "80px" },
              borderWidth: "5px",
              borderColor: "white",
              borderStyle: "solid",
              backgroundColor: "white",
            }}
          />
        ) : (
          // )

          // (loading ? <Skeleton variant="circular" width="auto" height="auto"/> :
          <Avatar
            alt="profile"
            loading="lazy"
            src={"/assets/images/svgs/profileDp.svg"}
            sx={{
              width: { xs: "120px", sm: "248px" },
              height: { xs: "120px", sm: "248px" },

              left: { xs: "0", md: "80px" },
              borderWidth: "5px",
              borderColor: "white",
              borderStyle: "solid",
            }}
          />
        )}
      </Box>

      <Box
        sx={{
          color: theme.palette.brandblack.primary,
          position: "relative",
          bottom: { xs: "65px", sm: "130px", md: "200px" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "left" },
          justifyContent: { xs: "center", md: "space-between" },
        }}
      >
        <Box
          sx={{
            position: "relative",
            left: { xs: 0, sm: 20, md: 220 },
            ml: { md: 14 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              maxWidth: "300px",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: { xs: "center", md: "left" },
            }}
          >
            <Typography noWrap pr={1} variant="h3" sx={{ maxWidth: "250px" }}>
              {profileData?.userName}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "420px",
              bgcolor: "#F7F3FF;",
              paddingLeft: 2,
              paddingRight: 2,
              borderRadius: "20px",
              marginTop: 1,
              marginBottom: 2,
            }}
          >
            <Typography
              noWrap
              component="span"
              variant="body5"
              sx={{
                color: theme.palette.brandblack.primary,
                fontSize: { xs: 18, sm: 24 },
                marginRight: 1,
                maxWidth: { xs: "200px", sm: "270px" },
              }}
            >
              {profileData?.publicAddress}
            </Typography>
            <Box>
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(wallet);
                  toast.success("Address Copied!", { autoClose: 500 });
                }}
              >
                <Image
                  alt="verified"
                  src="/assets/images/svgs/copy.svg"
                  sx={{
                    width: { xs: "18px", sm: "27px" },
                    height: { xs: "18px", sm: "27px" },
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box
          pt={3}
          sx={{
            position: "relative",
            right: { xs: 0, md: 30 },
            display: "flex",
            bottom: { xs: 0, md: 20 },
            flexDirection: "column",
            justifyContent: "flex-start",
            alignSelf: { xs: "center", md: "start" },
            alignItems: { xs: "center", md: "flex-end" },
          }}
        >
          {decodedAddress && decodedAddress === id ? (
            <NextLink href={Routes.editProfile}>
              <Button variant="containedInherit" size="medium">
                <Image
                  alt="edit"
                  src="/assets/images/svgs/edit.svg"
                  sx={{ width: "18px", height: "18px", mr: 1 }}
                />
                Edit Profile
              </Button>
            </NextLink>
          ) : null}

          <Box pt={2}>
            <SocialGroup
              directIcon="/assets/images/svgs/direct.svg"
              instaIcon="/assets/images/svgs/instagram.svg"
              twitterIcon="/assets/images/svgs/tweet.svg"
              webLink={profileData?.links?.web}
              instaLink={profileData?.links?.instagram}
              twitterLink={profileData?.links?.twitter}
            />
          </Box>
        </Box>
      </Box>

      <Container
        maxWidth={false}
        sx={{
          position: "relative",
          bottom: { md: 120 },
          boxShadow: (theme) => ({
            xs: 0,
          }),
          maxWidth: "1300px",

          height: "auto",
        }}
      >
        <Box>
          <CustomeTabs lists={lists} handle={handleChange} value={value} />
          {value === 0 ? (
            <OnSale />
          ) : value === 1 ? (
            <Owned />
          ) : value === 2 ? (
            <Created />
          ) : value === 3 ? (
            <Collections />
          ) : value === 4 ? (
            <Favourites />
          ) : value === 5 ? (
            <Activity />
          ) : null}
        </Box>
      </Container>
    </>
  );
}
