import React from "react";

import PropTypes from "prop-types";

import { Iconify, SearchModal } from "../../components";
import { toast } from "react-toastify";

import searchIcon from "@iconify/icons-carbon/search";
import { getCategories } from "../../apis";

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
import { NavMobile, NavDesktop, navConfig } from "../nav";
import { ToolbarStyle, ToolbarShadowStyle } from "./HeaderToolbarStyle";
import { useEffect, useState } from "react";
import CustomLogo from "../CustomLogo";

import { removeCookies } from "../../utils/removeCookies";
import { useRouter } from "next/router";
import { useAppContext } from "src/context-api/appContext";
import { getUserCookie } from "../../utils/getCookies";

// ----------------------------------------------------------------------

AdminHeader.propTypes = {
  transparent: PropTypes.bool,
};

export default function AdminHeader({ transparent }) {
  const cookie = getUserCookie();

  const { state, dispatch } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    if (!cookie) {
      router.push("/admin/login");
    }
  }, []);

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

  //**********************************************************************/
  useEffect(async () => {
    if (state?.categories !== null) {
      const categories = await getCategories();
      let categoryData = categories?.data?.data;
      if (categoryData?.length > 0)
        dispatch({ type: "CATEGORIES", value: categoryData });
    }
  }, []);

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
      title: "Logout",
    },
  ];
  const handleSearchOpen = () => {
    setOpenSearchModal(true);
  };
  //**********************************************************************/

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
              router.push("/admin");
            }}
            sx={{ cursor: "pointer" }}
          >
            <CustomLogo />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Stack spacing={2} direction="row" alignItems="center">
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
                <Avatar
                  onClick={handleClickAvatar}
                  alt="Avatar"
                  src={"/assets/images/svgs/admin.jpg"}
                  sx={{
                    width: "47px",
                    height: "47px",
                    cursor: "pointer",
                  }}
                ></Avatar>

                <CustomMenu
                  isAdmin={true}
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
