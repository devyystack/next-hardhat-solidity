import PropTypes from "prop-types";
import { useState, useEffect } from "react";
// icons
import menuIcon from "@iconify/icons-carbon/menu";
import chevronRight from "@iconify/icons-carbon/chevron-right";
import chevronDown from "@iconify/icons-carbon/chevron-down";

import { useAppContext } from "src/context-api/appContext";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// @mui
import { alpha, styled } from "@mui/material/styles";
import {
	Box,
	List,
	Link,
	Stack,
	Button,
	Drawer,
	Collapse,
	ListItemText,
	ListItemButton,
} from "@mui/material";
// routes
import Routes from "../../routes";
// config
import { DRAWER_WIDTH } from "../../config";
// components
import { Logo, Scrollbar, Iconify, NavSection } from "../../components";
import { IconButtonAnimate } from "../../components/animate";
import CustomLogo from "../CustomLogo";

// ----------------------------------------------------------------------

const RootLinkStyle = styled(ListItemButton, {
	shouldForwardProp: (prop) => prop !== "active",
})(({ active, theme }) => ({
	...theme.typography.body2,
	height: 48,
	textTransform: "capitalize",
	paddingLeft: theme.spacing(2.5),
	paddingRight: theme.spacing(2.5),
	color: theme.palette.text.secondary,
	...(active && {
		color: theme.palette.primary.main,
		fontWeight: theme.typography.fontWeightMedium,
		backgroundColor: alpha(
			theme.palette.primary.main,
			theme.palette.action.selectedOpacity
		),
	}),
}));

// ----------------------------------------------------------------------

NavMobile.propTypes = {
	navConfig: PropTypes.array.isRequired,
	sx: PropTypes.object,
};

export default function NavMobile({ navConfig, sx }) {
	const router = useRouter();
	const { pathname } = useRouter();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { state, dispatch } = useAppContext();
	const { appyFilter } = state;

	useEffect(() => {
		if (drawerOpen) {
			handleDrawerClose();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const handleDrawerOpen = () => {
		setDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	return (
		<>
			<IconButtonAnimate color="inherit" onClick={handleDrawerOpen} sx={sx}>
				<Iconify icon={menuIcon} />
			</IconButtonAnimate>

			<Drawer
				open={drawerOpen}
				onClose={handleDrawerClose}
				ModalProps={{ keepMounted: true }}
				PaperProps={{
					sx: { width: DRAWER_WIDTH },
				}}
			>
				<Scrollbar>
					<Box sx={{ px: 2.5, py: 3, lineHeight: 0 }}>
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
					</Box>

					<List sx={{ px: 0 }}>
						{navConfig.map((link) => (
							<NavItemMobile key={link.title} item={link} />
						))}
					</List>

					{/* <Stack spacing={2} sx={{ p: 2.5, pb: 5 }}>
            <NextLink href=>
              <Button fullWidth variant="outlined" color="inherit">
                Login
              </Button>
            </NextLink>

            <NextLink href={Routes.registerIllustration}>
              <Button fullWidth variant="contained" color="inherit">
                Join Us
              </Button>
            </NextLink>
          </Stack> */}
				</Scrollbar>
			</Drawer>
		</>
	);
}

// ----------------------------------------------------------------------

NavItemMobile.propTypes = {
	item: PropTypes.shape({
		children: PropTypes.array,
		path: PropTypes.string,
		title: PropTypes.string,
	}),
};

function NavItemMobile({ item }) {
	const { pathname } = useRouter();

	const { title, path, children } = item;
	const rootPath = pathname.split("/")[1];
	const isActiveRoot = pathname === path;
	const isActiveRootWithChild = pathname.includes(`/${rootPath}/`);

	const [open, setOpen] = useState(isActiveRootWithChild);

	const handleOpen = () => {
		setOpen(!open);
	};

	if (children) {
		return (
			<>
				<RootLinkStyle onClick={handleOpen} active={isActiveRootWithChild}>
					<ListItemText disableTypography primary={title} />
					<Iconify
						icon={open ? chevronDown : chevronRight}
						sx={{ width: 16, height: 16, ml: 1 }}
					/>
				</RootLinkStyle>

				<Collapse in={open} timeout="auto" unmountOnExit>
					<Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
						<NavSection
							navConfig={children}
							sx={{
								// Root
								position: "relative",
								"&:before": {
									top: 0,
									bottom: 0,
									height: 0.96,
									my: "auto",
									left: 20,
									width: "1px",
									content: "''",
									bgcolor: "divider",
									position: "absolute",
								},
								"& .MuiListSubheader-root": { mb: 1 },
								"& .MuiListItemButton-root": {
									backgroundColor: "transparent",
									"&:before": { display: "none" },
								},
								// Sub
								"& .MuiCollapse-root": {
									"& .MuiList-root": {
										"&:before": {
											top: 0,
											bottom: 0,
											left: 40,
											my: "auto",
											height: 0.82,
											width: "1px",
											content: "''",
											bgcolor: "divider",
											position: "absolute",
										},
									},
									"& .MuiListItemButton-root": {
										pl: 8,
										"& .MuiListItemIcon-root, .MuiTouchRipple-root": {
											display: "none",
										},
										"&:hover": {
											backgroundColor: "transparent",
										},
									},
								},
							}}
						/>
					</Box>
				</Collapse>
			</>
		);
	}

	if (title === "Documentation") {
		return (
			<Link href={path} underline="none" target="_blank" rel="noopener">
				<RootLinkStyle>
					<ListItemText disableTypography primary={title} />
				</RootLinkStyle>
			</Link>
		);
	}

	return (
		<NextLink key={title} href={path}>
			<RootLinkStyle active={isActiveRoot}>
				<ListItemText disableTypography primary={title} />
			</RootLinkStyle>
		</NextLink>
	);
}
