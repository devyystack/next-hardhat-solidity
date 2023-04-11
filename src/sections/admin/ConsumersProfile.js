

import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import Image from "src/components/Image";
import searchIcon from "@iconify/icons-carbon/search";
import { Iconify } from "../../components";
import React from "react";
import { Container, Typography, Link, Button, TextField, InputAdornment} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AvatarTypo } from '../../components/shared';

import { useRouter } from "next/router";
import NextLink from "next/link";

import { GetConsumerProfile, ConsumerData, GetConsumerOwnedNfts } from "../../apis";
import { ConsumerProfileTable, ConsumerOwnedTable } from "../../components/admin";
import { queryParamFormatter } from "../../utils/queryStringFormetter";
import { getUserCookie } from "../../utils/getCookies";

function ConsumersProfile() {
    const router = useRouter();
    const tokenData = getUserCookie();
    const [payload, setPayload] = React.useState({});
    const [publicAddress, setPublicAddress] = React.useState("");

    const [userProfile, setUserProfile] = React.useState([]);
    const [consumer, setConsumer] = React.useState([]);
    const [userOwned, setUserOwned] = React.useState([]);



    const { id } = router.query;

    React.useEffect(() => {
        if (tokenData) {
            const wallet = id;
            const address = wallet?.toLowerCase();
            setPublicAddress(address);

        }
    }, [tokenData]);



    //   console.log("address", publicAddress);

    const getProfile = async () => {
        const consumer = await ConsumerData(id);
        if (consumer?.data?.data) {
            setConsumer(consumer?.data?.data)
        }

        const result = await GetConsumerProfile(id);
        if (result?.data?.data) {
            setUserProfile(result?.data?.data);
        }

        const owned = await GetConsumerOwnedNfts(id);
        if (owned?.data?.data) {
            setUserOwned(owned?.data?.data);
        }

    }


    React.useEffect(async () => {
        if (id) {
            await getProfile();
        }

    }, [id])

    const theme = useTheme();
    return (
        <Container
            maxWidth={false}
            sx={{
                maxWidth: "1300px",
                mt: "130px",
            }}
        >
            <Box width={"100%"} display="flex" justifyContent="flex-end"
            >

            {/* <NextLink href={`/profile/${id}`}>
              <a style={{ textDecoration: "none" }}> */}
                <AvatarTypo
                    isAdminProfile={true}
                    src={
                        consumer?.[0]?.profileImage ?
                        process.env.NEXT_PUBLIC_PINATA_BASE_URL + consumer?.[0]?.profileImage : null
                    }
                    text={consumer?.[0]?.userName ? consumer?.[0]?.userName : "Un named"}
                />
                {/* </a>
                </NextLink> */}

            </Box>

            <Box mt={3}>
                <Typography
                    variant="h4"
                    ml="10px"
                    sx={{
                        opacity: "1",
                        color: theme.palette.brandblack.primary,
                    }}
                    noWrap
                >
                    Owned NFTs
                </Typography>
            </Box>




            <Box width="100%" height="auto" mt={6}>
                <ConsumerOwnedTable ownedData={userOwned} />
            </Box>

            <Box mt={3}>
                <Typography
                    variant="h4"
                    ml="10px"
                    sx={{
                        opacity: "1",
                        color: theme.palette.brandblack.primary,
                    }}
                    noWrap
                >
                    Created NFTs
                </Typography>
            </Box>




            <Box width="100%" height="auto" mt={6}>
                <ConsumerProfileTable data={userProfile}/>
            </Box>








        </Container>
    );
}

export default ConsumersProfile;

