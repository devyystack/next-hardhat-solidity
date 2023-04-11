import React from "react";
import { Image } from "..";
import { styled } from "@mui/material/styles";
import { MenuItem, Menu, Link, Box } from "@mui/material";
import NextLink from "next/link";
import { useAppContext } from "../../context-api/appContext";

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
export default function CustomMenu({
	anchorEl,
	handleClose,
	data,
	handleOpen,
	onClick,
  	isProfile,
	isAdmin
}) {
	const { dispatch } = useAppContext();
	return (
		<Menu
			id="simple-menu"
			anchorEl={anchorEl}
			keepMounted
			autoFocus={false}
			open={Boolean(anchorEl)}
			onClose={handleClose}
			MenuListProps={{ onMouseLeave: handleClose, disablePadding: true }}
			PaperProps={{
				style: {
					minWidth: 150,
					marginTop: 5,
				},
			}}
			// getContentAnchorEl={null}
			anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			transformOrigin={{ vertical: "top", horizontal: "left" }}
		>
			{data &&
				data.length > 0 &&
				data.map((menu, index) => {
					return menu?.path ? (
						<NextLink href={menu.path} key={index} passHref>
							<MenuItemStyle>
								{menu.path && (
									<Box marginRight={"10px"}>
										<Image
											src={menu.src}
											sx={{ maxWidth: "20px", maxHeight: "20px" }}
										/>
									</Box>
								)}
								{menu.title}
							</MenuItemStyle>
						</NextLink>
					) : (

            isProfile ? (
              <NextLink href="/" key={index}>
              <Box onClick={onClick}>
                <MenuItemStyle onClick={handleOpen}>
                  {menu.src && (
                    <Box marginRight={"10px"}>
                      <Image
                        src={menu.src}
                        sx={{ maxWidth: "20px", maxHeight: "20px" }}
                      />
                    </Box>
                  )}
                  {menu.title}
                </MenuItemStyle>
              </Box>
            </NextLink>
 
            ) : isAdmin ? (
				<NextLink href="/admin/login" key={index}>
              <Box onClick={onClick}>
                <MenuItemStyle onClick={handleOpen}>
                  {menu.src && (
                    <Box marginRight={"10px"}>
                      <Image
                        src={menu.src}
                        sx={{ maxWidth: "20px", maxHeight: "20px" }}
                      />
                    </Box>
                  )}
                  {menu.title}
                </MenuItemStyle>
              </Box>
            </NextLink>

			)
			
			
			: (
              <Box key={index} onClick={onClick? onClick : null}>
              <MenuItemStyle
                onClick={() => {
                  dispatch({
                    type: "BIDS_FILTER",
                    value: menu.value,
                  });

                  dispatch({
                    type: "BIDS_TIME",
                    value: menu.title,
                  });
                  onClick();

                }
              }
              >
                {menu.src && (
                  <Box marginRight={"10px"}>
                    <Image
                      src={menu.src}
                      sx={{ maxWidth: "20px", maxHeight: "20px" }}
                    />
                  </Box>
                )}
                {menu.title}
              
              </MenuItemStyle>
            </Box>

            )
            
					
					);
				})}
		</Menu>
	);
}
