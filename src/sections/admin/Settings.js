


import React, { useEffect } from "react";
//mui
import { Box, Grid, Container, Typography, Button, Link, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import CircularProgress from "@mui/material/CircularProgress";
import { Image } from "../../components";
import { getUserCookie } from "../../utils/getCookies";
import Paper from '@mui/material/Paper';
import { TrendingNft, NewNfts, ChangePassword , CategoryTable} from "../../components/admin";

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


function Settings() {

    const theme = useTheme();

    return (
        <Container
            maxWidth={false}
            sx={{
                boxShadow: (theme) => ({
                    xs: 0,
                }),
                maxWidth: "1300px",
                pt: "20px",
            }}
        >


            <Grid container mt={1} spacing={8} mb={6}>
                <Grid item xs={12} lg={4} >

                    <Box width="100%" display="flex" flexDirection={'column'} justifyContent="center" px={2}>
                        <Typography variant="h3">
                            Change Password

                        </Typography>

                        <Typography variant="h3Light">
                            Admin here you can easily change your password

                        </Typography>

                    </Box>

                </Grid>

                <Grid item xs={12} lg={8}>
                    <Box display="flex" justifyContent="flex-end">
                        <ChangePassword />

                    </Box>

                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ height: 'auto', mb: 2 }} />
                </Grid>

            </Grid>

            <Grid container spacing={8} mb={6}>
                <Grid item xs={12} lg={4} >

                    <Box width="100%" display="flex" flexDirection={'column'} justifyContent="center" px={2} >
                        <Typography variant="h3">
                        Setup Category

                        </Typography>

                        <Typography variant="h3Light">
                        Admin can Edit, or Check listing of all categories

                        </Typography>

                    </Box>

                </Grid>

                <Grid item xs={12} lg={8}>
                    <Box display="flex" justifyContent="flex-start">
                        <CategoryTable />

                    </Box>

                </Grid>


            </Grid>





        </Container>
    );
}

export default Settings;
