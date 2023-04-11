import PropTypes from "prop-types";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  List,
  Link,
  Stack,
  ListItem,
  ListSubheader,
  Menu,
  MenuItem,
} from "@mui/material";
import { useAppContext } from "../../context-api/appContext";


//
import Image from "../../components/Image";
// ----------------------------------------------------------------------

const MenuItemStyle = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active, theme }) => ({
  fontSize: theme.typography.subtitle2,
  fontWeight: theme.typography.fontWeightMedium,
  //width: 'auto',
  cursor: "pointer",
  color: theme.palette.brandblack.primary,
  transition: theme.transitions.create("color"),
  "&:hover": {
    color: theme.palette.text.primary,
  },
  ...(active && {
    ...theme.typography.subtitle3,
    color: theme.palette.text.primary,
  }),
}));

const SubLinkStyle = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active, theme }) => ({
  ...theme.typography.body3,
  fontSize: theme.typography.subtitle2,
  fontWeight: theme.typography.fontWeightMedium,
  padding: 0,
  width: "auto",
  cursor: "pointer",
  color: theme.palette.brandblack.primary,
  transition: theme.transitions.create("color"),
  "&:hover": {
    color: theme.palette.text.primary,
  },
  ...(active && {
    ...theme.typography.subtitle3,
    color: theme.palette.text.primary,
  }),
}));

const IconBulletStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active, theme }) => ({
  width: 12,
  height: 24,
  display: "flex",
  alignItems: "center",
  color: theme.palette.brandblack.primary,
  "&:before": {
    content: '""',
    display: "block",
    width: 4,
    height: 4,
    borderRadius: "50%",
    backgroundColor: theme.palette.brandblack.primary,
  },
  ...(active && {
    "&:before": {
      content: '""',
      width: 6,
      height: 6,
      borderRadius: "50%",
      backgroundColor: theme.palette.brandblack.primary,
      transition: theme.transitions.create("all", {
        duration: theme.transitions.duration.shortest,
      }),
    },
  }),
}));

const ListSubheaderStyled = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.h5,
  marginBottom: theme.spacing(2.5),
  color: theme.palette.text.primary,
}));

NavSubMenu.propTypes = {
  open: PropTypes.bool,
  lists: PropTypes.array,
  handleClose: PropTypes.func,
};

export default function NavSubMenu({ lists, anchorEl, handleClose }) {
  const router = useRouter();
  //const minList = lists.length > 5;

  return (
    <Menu
      id="simple-menu"
      keepMounted
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      MenuListProps={{ onMouseLeave: handleClose, disablePadding: true }}
      // getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Grid container className="scrollBar">
        <Grid item xs={12}>
          <Box
            sx={{
              position: "relative",
              px: 2,
              py: 2,
              display: "flex",
            }}
          >
            {lists.map((list, index) => {
              const { subheader, items } = list;

              const path = items.length > 0 ? items[0].path : "";

              return (
                <List key={index} disablePadding sx={{ minWidth: "200px" }}>
                  {subheader && (
                    <div>
                      <ListSubheaderStyled>{subheader}</ListSubheaderStyled>
                    </div>
                  )}
                  <Stack alignItems="flex-start">
                    {items?.map((item, index) => {
                      const { title, path, src } = item;

                      const active =
                        router.pathname === path || router.asPath === path;

                      return (
                        <LinkItem
                          key={index}
                          title={title}
                          href={path}
                          active={active}
                          src={src}
                        />
                        // <NextLink key={title} href={path} passHref>
                        //   <MenuItem sx={{ minWidth: '100%' }}>{title}</MenuItem>
                        // </NextLink>
                      );
                    })}
                  </Stack>
                </List>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Menu>
  );
}

LinkItem.propTypes = {
  active: PropTypes.bool,
  href: PropTypes.string,
  title: PropTypes.string,
};

function LinkItem({ title, href, active, src }) {
  const { dispatch } = useAppContext();

  return (
    
    <NextLink  key={title} href={href} passHref>
      <Link onClick={()=>{dispatch({type:"APPLY_FILTER",value:[]});
                      dispatch({type:"PROFILE_NFTS",value:[]})
                      
                    }}
                      color="inherit" underline="hover" sx={{ minWidth: "100%" }}>
        <MenuItemStyle active={active}>
          {/* <IconBulletStyle active={active} /> */}

          {src && (
            <Box onClick={()=>{dispatch({type:"APPLY_FILTER",value:[]});
            dispatch({type:"PROFILE_NFTS",value:[]})}}
            
            marginRight={"10px"}>
              <Image src={src} sx={{ maxWidth: "20px", maxHeight: "20px" }} />
            </Box>
          )}
          {title}
        </MenuItemStyle>
      </Link>
    </NextLink>
  );
}
