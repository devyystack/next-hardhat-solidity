import PropTypes from "prop-types";
import { useState } from "react";
// icons
import chevronDown from "@iconify/icons-carbon/chevron-down";
import chevronRight from "@iconify/icons-carbon/chevron-right";
// next
import NextLink from "next/link";
// @mui
import { Image } from "../../components";

import Masonry from "@mui/lab/Masonry";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  Link,
  Stack,
  Divider,
  Collapse,
  Container,
  Typography,
} from "@mui/material";
// hooks
import { useResponsive } from "../../hooks";
// components
import { Iconify, SocialsButton } from "../../components";
//
import { FooterPageLinks } from "../nav/NavConfig";
import { useRouter } from "next/router";
// ----------------------------------------------------------------------

export default function Footer() {
  const router = useRouter();
  const isDesktop = useResponsive("up", "md");
  const theme = useTheme();
  const lists = FooterPageLinks.filter(
    (list) => list.subheader !== "Coming Soon"
  );

  const renderLists = isDesktop
    ? lists
    : lists.sort((listA, listB) => Number(listA.order) - Number(listB.order));

  return (
    <>
      {/* <Divider /> */}
      <Container
        maxWidth={false}
        sx={{ py: { xs: 8, md: 10 }, maxWidth: "1300px" }}
      >
        <Grid container spacing={3} justifyContent={{ md: "space-between" }}>
          <Grid item>
            <Stack spacing={{ xs: 3, md: 5 }}>


              <Stack spacing={2}>
                <Stack spacing={0}>
                  <NextLink href="https://twitter.com/DStageNFT">
                      <a
                      
                       style={{ textDecoration: "none", color: theme.palette.brandblack.primary,
                       "&:hover": {
                        color: theme.palette.brandblack.primary,
                        textDecoration: 'underline',
                        
                      },
                       }}
                        variant="body3"
                       
                      >


                        <Box display="flex" flex-direction="row" width="80px">
                          <Image
                            alt="cover"
                            src="/assets/images/svgs/twitter.svg"
                            sx={{ marginRight: 2 }}
                          />
                          <Typography variant="body3">Twitter</Typography>

                        </Box>
                      </a>
                    </NextLink>

                </Stack>

                <Stack spacing={0}>
                  <NextLink href="https://discord.gg/dstagecommunity">
                      <a
                      
                       style={{ textDecoration: "none", color: theme.palette.brandblack.primary,
                       "&:hover": {
                        color: theme.palette.brandblack.primary,
                        textDecoration: 'underline',
                        
                      },
                       }}
                        variant="body3"
                       
                      >


                        <Box display="flex" flex-direction="row" width="80px">
                          <Image
                            alt="cover"
                            src="/assets/images/svgs/discord.svg"
                            sx={{ marginRight: 2 }}
                          />
                          <Typography variant="body3">Discord</Typography>

                        </Box>
                      </a>
                    </NextLink>

                </Stack>

              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            {isDesktop ? (
              <Masonry columns={3} spacing={3}>
                {renderLists.map((list, index) => (
                  <ListDesktop key={index} list={list} />
                ))}
              </Masonry>
            ) : (
              <Stack spacing={1.5}>
                {renderLists.map((list, index) => (
                  <ListMobile key={index} list={list} />
                ))}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Container maxWidth={false} sx={{ maxWidth: "1300px" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2.5}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: "center" }}
        >
          <Typography variant="subtitle1">
            DStage.io. All Rights Reserved
          </Typography>
          {/* <Stack direction="row" spacing={3} justifyContent="center">
            <SocialsButton />
          </Stack> */}
        </Stack>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

NextLinkItem.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};
function NextLinkItem({ children, sx, ...other }) {
  const theme = useTheme();
  return (
    <NextLink passHref {...other}>
      <Link
        variant="body3"
        sx={{
          mt: 1,
          color: theme.palette.brandblack.primary,
          "&:hover": {
            color: theme.palette.brandblack.primary,
          },
          ...sx,
        }}
      >
        {children}
      </Link>
    </NextLink>
  );
}

// ----------------------------------------------------------------------

ListDesktop.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

function ListDesktop({ list }) {
  const { subheader, items } = list;

  return (
    <Stack alignItems="flex-start" sx={{ pb: { md: 1 } }}>
      <Typography variant="h6">{subheader}</Typography>
      {items?.map((link) => (
        <NextLinkItem key={link.title} href={link.path}>
          {link.title}
        </NextLinkItem>
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

ListMobile.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

function ListMobile({ list }) {
  const { subheader, items } = list;
  const [expand, setExpand] = useState(false);

  const onExpand = () => {
    setExpand(!expand);
  };

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="h6"
        onClick={onExpand}
        sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        {subheader}
        <Iconify
          icon={expand ? chevronDown : chevronRight}
          sx={{ width: 20, height: 20, ml: 0.5 }}
        />
      </Typography>

      <Collapse in={expand} sx={{ width: 1 }}>
        <Box
          sx={{
            display: "grid",
            rowGap: 1,
            columnGap: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            },
          }}
        >
          {items?.map((link) => (
            <NextLinkItem key={link.title} href={link.path}>
              {link.title}
            </NextLinkItem>
          ))}
        </Box>
      </Collapse>
    </Stack>
  );
}
