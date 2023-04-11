import PropTypes from "prop-types";
import { useState } from "react";
// icons
import chevronRight from "@iconify/icons-carbon/chevron-right";
import chevronDown from "@iconify/icons-carbon/chevron-down";
import chevronUp from "@iconify/icons-carbon/chevron-up";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// @mui
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
} from "@mui/material";
// components
import { Iconify } from ".";

// ----------------------------------------------------------------------

const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(5),
  color: theme.palette.text.primary,
}));

const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "activeRoot" && prop !== "activeSub",
})(({ activeRoot, activeSub, theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  ...(activeRoot && {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    "&:before": {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: "block",
      position: "absolute",
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(activeSub && {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
  }),
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": {
    width: 22,
    height: 22,
  },
});

const ListSubItemIconStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active, theme }) => ({
  width: 4,
  height: 4,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.text.disabled,
  transition: theme.transitions.create("transform"),
  ...(active && {
    transform: "scale(2)",
    backgroundColor: theme.palette.primary.main,
  }),
}));

// ----------------------------------------------------------------------

NavSection.propTypes = {
  navConfig: PropTypes.array.isRequired,
};

export default function NavSection({ navConfig, ...other }) {
  return (
    <Box {...other}>
      {navConfig.map((list, index) => (
        <List key={index} disablePadding sx={{ px: 0 }}>
          <ListSubheaderStyle>{list.subheader}</ListSubheaderStyle>
          {list.items.map((item, indexx) => (
            <NavSectionItem key={indexx} item={item} />
          ))}
        </List>
      ))}
    </Box>
  );
}

// ----------------------------------------------------------------------

NavSectionItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.any,
    info: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.array,
  }),
};

function NavSectionItem({ item }) {
  const { pathname, asPath } = useRouter();

  const { title, path, icon, info, children } = item;
  const isActiveRoot = pathname === path || asPath === path;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen(!open);
  };

  if (children) {
    return (
      <>
        <ListItemStyle onClick={handleOpen} activeRoot={isActiveRoot}>
          {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
          <ListItemText disableTypography primary={title} />
          {info}
          <Iconify
            icon={open ? chevronDown : chevronRight}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((value, index) => {
              const isActiveSub =
                pathname === value.path || asPath === value.path;

              return (
                <NextLink key={index} href={value.path}>
                  <ListItemStyle activeSub={isActiveSub}>
                    <ListItemIconStyle>
                      <ListSubItemIconStyle
                        component="span"
                        active={isActiveSub}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={value.title} />
                  </ListItemStyle>
                </NextLink>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <NextLink href={path}>
      <ListItemStyle activeRoot={isActiveRoot}>
        {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
        <ListItemText disableTypography primary={title} />
        {info && info}
      </ListItemStyle>
    </NextLink>
  );
}
