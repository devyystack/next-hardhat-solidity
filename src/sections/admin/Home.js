
import React, { useEffect } from "react";
//mui
import { Box, Grid, Container, Typography, Button, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import CircularProgress from "@mui/material/CircularProgress";
import { Image } from "../../components";
import { getUserCookie } from "../../utils/getCookies";
import Paper from '@mui/material/Paper';
import { TrendingNft, NewNfts, AuctionNfts, TopCreators} from "../../components/admin";

// common

import {
    CardHeadingGradient,
    TrandingNft,
    CardHeading,
} from "../../components/shared";
import { AdminNft } from "src/components/nft";
// routes
// import Routes from "src/routes";
// import { GetNftsList } from "../../apis";
// import { useAppContext } from "../../context-api/appContext";
// import { converter } from "../../utils/ethConverter";


function Home() {

    const theme = useTheme();

    return (
        <Container
            maxWidth={false}
            sx={{
                boxShadow: (theme) => ({
                    xs: 0,
                }),
                maxWidth: "1300px",
                pt: "40px",
            }}
        >


            <Grid container mt={2} spacing={4} mb={6}>
                <Grid item xs={12} md={8} >
                   <TrendingNft/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <NewNfts/>
                </Grid>

            </Grid>

            <Box>
                <AuctionNfts/>

            </Box>
            
            <Box mt={4} mb={8}>
                <TopCreators/>

            </Box>




        </Container>
    );
}

export default Home;
