import PropTypes from "prop-types";
import { useState, useEffect } from "react";
// icons
import chevronDown from "@iconify/icons-carbon/chevron-down";
import chevronUp from "@iconify/icons-carbon/chevron-up";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

// @mui
import { styled } from "@mui/material/styles";
import { Link, Stack, Menu, MenuItem } from "@mui/material";
// components
import { Iconify } from "../../components";
//
import NavSubMenu from "./NavSubMenu";

import { getUserCookie } from "../../utils/getCookies";
import { useAppContext } from "../../context-api/appContext";

// ----------------------------------------------------------------------

const RootLinkStyle = styled(Link, {
  shouldForwardProp: (prop) =>
    prop !== "active" &&
    prop !== "scrolling" &&
    prop !== "transparent" &&
    prop !== "open",
})(({ active, scrolling, transparent, open, theme }) => {
  const dotActiveStyle = {
    "&:before": {
      top: 0,
      width: 6,
      height: 6,
      bottom: 0,
      left: -14,
      content: '""',
      display: "block",
      margin: "auto 0",
      borderRadius: "50%",
      position: "absolute",
      backgroundColor: theme.palette.brandpurple.primary,
    },
  };
  return {
    fontSize: theme.typography.subtitle2,
    fontWeight: theme.typography.fontWeightMedium,
    display: "flex",
    color: theme.palette.brandblack.primary,
    position: "relative",
    alignItems: "center",
    whiteSpace: "nowrap",
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shortest,
    }),
    "&:hover": {
      // opacity: 0.72,
      textDecoration: "none",
      color: theme.palette.brandpurple.primary,
    },
    ...(active && {
      ...dotActiveStyle,
      color: theme.palette.brandpurple.primary,
      ...(transparent && { color: theme.palette.brandpurple.primary }),
      ...(scrolling && { color: theme.palette.brandpurple.primary }),
    }),
    ...(open && {
      color: theme.palette.brandpurple.primary,
    }),
  };
});

// ----------------------------------------------------------------------

NavDesktop.propTypes = {
  isScrolling: PropTypes.bool,
  isTransparent: PropTypes.bool,
  navConfig: PropTypes.array.isRequired,
};

export default function NavDesktop({ isScrolling, isTransparent, navConfig }) {
  const token = getUserCookie();
  const [role, setRole] = useState("");
  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      const role = decoded.model;
      setRole(role);
    }
  }, [token]);
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        color: "text.secondary",
        ...(isTransparent && {
          color: "inherit",
        }),
        ...(isScrolling && {
          color: "text.secondary",
        }),
      }}
      maxWidth={{
        md: "400px",
        lg: "100%",
      }}
      className="scrollBar"
    >
      {navConfig.map((link) => {
        if ((!token || role === "admins") && link.path === "/profile") {
          return;
        }
        return (
          <NavItemDesktop
            key={link.title}
            item={link}
            isScrolling={isScrolling}
            isTransparent={isTransparent}
          />
        );
      })}
    </Stack>
  );
}

// ----------------------------------------------------------------------

NavItemDesktop.propTypes = {
  isScrolling: PropTypes.bool,
  isTransparent: PropTypes.bool,
  item: PropTypes.shape({
    children: PropTypes.array,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};

function NavItemDesktop({ item, isScrolling, isTransparent }) {
  const [wallet, setWallet] = useState("");

  const token = getUserCookie();
  useEffect(() => {
    if (token) {
      var decoded = jwt_decode(token);
      const walletAddress = decoded.publicAddress;
      setWallet(walletAddress);
    }
  }, [token]);
  const { title, path, children } = item;

  const { pathname, asPath } = useRouter();

  const [open, setOpen] = useState(false);

  const isActiveRoot =
    path === pathname || (path !== "/" && asPath.includes(path));
  const [anchorEl, setAnchorEl] = useState(null);
  const { dispatch } = useAppContext();

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  // useEffect(() => {
  //   if (open) {
  //     handleClose();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  if (children) {
    return (
      <>
        <RootLinkStyle
          // onClick={handleOpen}
          // open={open}
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          // onMouseOver={handleClick}
          scrolling={isScrolling}
          transparent={isTransparent}
        >
          {title}
          <Iconify
            icon={Boolean(anchorEl) ? chevronUp : chevronDown}
            sx={{
              ml: 0.5,
              width: 16,
              height: 16,
            }}
          />
        </RootLinkStyle>
        <NavSubMenu
          lists={children}
          open={open}
          handleClose={handleClose}
          anchorEl={anchorEl}
        />
      </>
    );
  }

  return (
    // key={title} href={`${path}/${wallet}`}
    <NextLink key={title} href={`${path}/${wallet}`} passHref>
      <RootLinkStyle
        onClick={
          () => {
            dispatch({ type: "APPLY_FILTER", value: [] });
            dispatch({ type: "PROFILE_NFTS", value: [] });
            dispatch({ type: "SALE_FILTER", value: [] });
            dispatch({ type: "PRICE_FILTER", value: { min: 0, max: 0 } });
            console.log("In profile...");
          }
          // (dispatch({ type: "PROFILE_NFTS", value: [] }))
        }
        active={isActiveRoot}
        scrolling={isScrolling}
        transparent={isTransparent}
      >
        {title}
      </RootLinkStyle>
    </NextLink>
  );
}
