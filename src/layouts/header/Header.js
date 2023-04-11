import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import NextLink from "next/link";
import HomePage from "../../../pages/index";

import { LogoutMenu, Iconify, SearchModal } from "../../components";
import { toast } from "react-toastify";

import { getUserData } from "../../users/getUserData";
import searchIcon from "@iconify/icons-carbon/search";
import jwt_decode from "jwt-decode";

// @mui
//import { useTheme } from "@mui/material/styles";
import {
  Box,
  Stack,
  Button,
  AppBar,
  Divider,
  Container,
  Avatar,
} from "@mui/material";
import { getUserCookie } from "../../utils/getCookies";
// hooks
import { useOffSetTop, useResponsive } from "../../hooks";
// routes
import Routes from "../../routes";
// config
import { HEADER_DESKTOP_HEIGHT } from "../../config";
// components
import { CustomMenu } from "../../components/shared";
// icons
import chevronDown from "@iconify/icons-carbon/chevron-down";
import chevronUp from "@iconify/icons-carbon/chevron-up";
//
import Searchbar from "../Searchbar";
import { NavMobile, NavDesktop, navConfig } from "../nav";
import { ToolbarStyle, ToolbarShadowStyle } from "./HeaderToolbarStyle";
import { useEffect, useState } from "react";
import CustomLogo from "../CustomLogo";

import { connectWallet } from "../../apis/wallet/WalletApi";

import { useAppContext } from "src/context-api/appContext";

import { removeCookies } from "../../utils/removeCookies";

import { dehydrate, QueryClient, useQuery } from "react-query";

import { useRouter } from "next/router";
import { getCategories } from "../../apis";

// ----------------------------------------------------------------------

Header.propTypes = {
  transparent: PropTypes.bool,
};

export default function Header({ transparent }) {
  const { state, dispatch } = useAppContext();
  const { userData } = state;

  const router = useRouter();

  const { data, isLoading } = useQuery("header", getUserData);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  // useEffect(() => {
  //   if (userData) {
  //     setUserStatus(true);
  //   }
  // }, [userData]);

  const isDesktop = useResponsive("up", "md");
  const isScrolling = useOffSetTop(HEADER_DESKTOP_HEIGHT);
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarAnchor, setAvatarAnchor] = useState(null);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const handleSearchModalClose = () => {
    setOpenSearchModal(false);
  };

  function handleAnchorEl(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }
  function handleClick(event) {
    return handleAnchorEl(event);
  }
  function handleClickOpenChevron(event) {
    return handleAnchorEl(event);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const navData = [
    {
      title: "Create NFT",
      path: Routes.createnft,
      src: "/assets/images/svgs/createNft.svg",
    },
    {
      title: " Create Collections",
      path: Routes.createcollection,
      src: "/assets/images/svgs/createCollectionIcon.svg",
    },
  ];

  /////////////// Connect Wallet //////////////

  const handleConnectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      return toast.error("Install your metamask wallet", {
        autoClose: 1500,
      });
    }
    const user = await connectWallet();
    dispatch({ type: "USER_DATA", value: user });
  };
  const cookie = getUserCookie();
  const [role, setRole] = useState("");
  useEffect(() => {
    if (cookie) {
      const decoded = jwt_decode(cookie);
      const role = decoded.model;
      setRole(role);
    }
  }, [cookie]);

  /////////////// Destroy cookies //////////////

  const handleCookies = () => {
    removeCookies();
  };

  function AnchorElAvatar(event) {
    if (avatarAnchor !== event.currentTarget) {
      setAvatarAnchor(event.currentTarget);
    }
  }
  function handleClickAvatar(event) {
    return AnchorElAvatar(event);
  }

  function avatarClose() {
    setAvatarAnchor(null);
  }

  const avatarData = [
    {
      title: "Sign out",
    },
  ];
  const handleSearchOpen = () => {
    setOpenSearchModal(true);
  };
  //**********************************************************************/
  useEffect(async () => {
    const categories = await getCategories();
    let categoryData = categories?.data?.data;
    if (categoryData.length > 0)
      dispatch({ type: "CATEGORIES", value: categoryData });
  }, [navConfig]);
  useEffect(() => {
    navConfig.map((data) => {
      if (data?.children) {
        data?.children.map((child) => {
          if (child?.items.length < state?.categories.length) {
            state?.categories.map((category) => {
              child?.items.push({
                title: category?.category_name,
                path: "/category-collections/" + category?._id,
              });
            });
          }
        });
      }
    });
  }, [navConfig, state?.categories]);
  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: "transparent" }}>
      <ToolbarStyle
        disableGutters
        transparent={transparent}
        scrolling={isScrolling}
      >
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            maxWidth: "1300px",
          }}
        >
          <Box
            onClick={() => {
              dispatch({ type: "APPLY_FILTER", value: [] });
              dispatch({ type: "PROFILE_NFTS", value: [] });
              router.push("/");
            }}
            sx={{ cursor: "pointer" }}
          >
            <CustomLogo />
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <Stack spacing={2} direction="row" alignItems="center">
            {isDesktop && (
              <NavDesktop
                isScrolling={isScrolling}
                isTransparent={transparent}
                navConfig={navConfig}
              />
            )}

            <Divider orientation="vertical" sx={{ height: 24 }} />
            {/* <Searchbar
              sx={{
                ...(isScrolling && { color: "text.primary" }),
              }}
            /> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => handleSearchOpen()}
            >
              <Iconify icon={searchIcon} sx={{ width: 20, height: 20 }} />
            </Box>
            {isDesktop && (
              <Stack direction="row" spacing={1}>
                {cookie && role !== "admins" && (
                  <Button
                    variant="containedInherit"
                    href={Routes.buyNow}
                    target="_blank"
                    rel="noopener"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      minWidth: "104px",
                    }}
                    onClick={handleClick}
                    // onMouseOver={handleClick}
                  >
                    Create
                    <Iconify
                      icon={Boolean(anchorEl) ? chevronUp : chevronDown}
                      sx={{
                        ml: 0.5,
                        width: 16,
                        height: 16,
                      }}
                      onClick={handleClickOpenChevron}
                    />
                  </Button>
                )}

                <CustomMenu
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                  data={navData}
                  handleOpen={handleClickOpenChevron}
                />

                {!cookie ? (
                  <Button
                    variant="outlinedInherit"
                    sx={{ minWidth: "104px" }}
                    onClick={handleConnectWallet}
                  >
                    Sign In
                  </Button>
                ) : data?.profileImage !== "" ? (
                  <Avatar
                    onClick={handleClickAvatar}
                    alt="Avatar"
                    src={
                      userData?.data?.profileImage
                        ? process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                          userData?.data?.profileImage
                        : userData?.data?.data?.profileImage
                        ? process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                          userData?.data?.data?.profileImage
                        : process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                          data?.profileImage
                    }
                    sx={{
                      width: "47px",
                      height: "47px",
                      cursor: "pointer",
                    }}
                  ></Avatar>
                ) : (
                  <Avatar
                    onClick={handleClickAvatar}
                    alt="Avatar"
                    src={"/assets/images/svgs/profileDp.svg"}
                    sx={{
                      width: "47px",
                      height: "47px",
                      cursor: "pointer",
                    }}
                  ></Avatar>
                )}

                <CustomMenu
                  isProfile={true}
                  anchorEl={avatarAnchor}
                  handleClose={avatarClose}
                  data={avatarData}
                  onClick={handleCookies}
                />

                {/* <LogoutMenu
									anchorEl={anchorElAvatar}
									handleClose={handleCloseAvatar}
									handleCookies={handleLogout}
								/> */}
              </Stack>
            )}
          </Stack>

          {!isDesktop && (
            <NavMobile
              navConfig={navConfig}
              sx={{
                ml: 1,
                ...(isScrolling && { color: "text.primary" }),
              }}
            />
          )}
        </Container>
      </ToolbarStyle>

      {isScrolling && <ToolbarShadowStyle />}
      <SearchModal
        openSearchModal={openSearchModal}
        handleSearchModalClose={handleSearchModalClose}
      />
    </AppBar>
  );
}
