import * as React from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  TrandingNft,
  AvatarActivity,
  ActivityCard,
} from "../../components/shared";
import { NFT } from "src/components/nft";
import { Image } from "../../components";

import { TimelineOppositeContent } from "@mui/lab";
import { converter } from "../../utils/ethConverter";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import moment from "moment";
import { useRouter } from "next/router";
import { useAppContext } from "src/context-api/appContext";

import { GetActivity } from "../../apis";
import { getUserCookie } from "../../utils/getCookies";
import jwt_decode from "jwt-decode";



function Activity() {
  const router = useRouter();
	const { state } = useAppContext();
  const [decodedAddress, setDecodedAddress] = React.useState("");

  const [wallet, setWallet] = React.useState("");
  const [activityData, setActivityData] = React.useState([]);

  const token = getUserCookie();
  const { id } = router.query;

  React.useEffect(() => {
    if (token) {
      const walletAddress = id;
      setWallet(walletAddress);

      let decoded = jwt_decode(token);
      const loginAddress = decoded.publicAddress;
      setDecodedAddress(loginAddress);
    }
  }, [token]);

  const getActivityData = async() => {
    const publicAddress = wallet?.toLowerCase();
    const nftsResult = await GetActivity(token, publicAddress);
    if (nftsResult?.data?.data) {
      setActivityData(nftsResult?.data?.data);
    }

  }

  React.useEffect(() => {
    if(wallet){
      getActivityData();

    }
  },[wallet])

  console.log("userData...", state?.userProfile);

 
  const theme = useTheme();

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          boxShadow: (theme) => ({
            xs: 0,
          }),
          maxWidth: "1300px",
          pt: "46px",
          height: "auto",
        }}
      >
        {activityData && activityData.length > 0 ?(
           <Timeline align="left" className="timeline">
           <TimelineItem>
             <TimelineOppositeContent
               style={{
                 display: "flex",
                 justifyContent: "flex-start",
                 maxWidth: "1px",
               }}
             />
             <TimelineSeparator>
               <TimelineDot />
               <TimelineConnector />
             </TimelineSeparator>
             <Grid container>
               {activityData?.map((value, index) => {
                //  let nft = value?.nft;  // nft data
                //  let owner = value?.nft?.nft_owners[value?.nft?.nft_owners.length - 1];   // price nft
                //  let user = value?.userData[value?.userData?.length - 1];
                //  let collection = value?.collection;
 
               return(
                 <Grid item xs={12} key={index}>
                 <TimelineContent>
 
                 <AvatarActivity
              
                   src={state?.userProfile?.profileImage!=='' ? 
                   process.env.NEXT_PUBLIC_PINATA_BASE_URL + state?.userProfile?.profileImage : "/assets/images/svgs/profileDp.svg"}

                   date={value?.createdAt }
                   // activity={`You created a new ${nft?.nft_name}  NFT ${moment(value?.activity_time).fromNow()}.`}
 
                   activity={ value?.status === "buySell" && id?.toLowerCase()===value?.nft_buyer.toLowerCase()?
                     (`Bought ${value?.nft?.nft_name}  NFT ${moment(value?.createdAt).fromNow()}.`) 
 
                     :value?.status === "buySell" && id?.toLowerCase()===value?.nft_seller.toLowerCase()?
                       (`Sold ${value?.nft?.nft_name}  NFT ${moment(value?.createdAt).fromNow()}.`) 
 
                     : value?.status === "created" ? 
                      (`Created ${value?.nft?.nft_name}  NFT ${moment(value?.createdAt).fromNow()}.`)
 
                      : value?.status === "remove" ? 
                      (`Removed from sale ${value?.nft?.nft_name}  NFT ${moment(value?.createdAt).fromNow()}.`)
 
                      : value?.status === "onSale" ? 
                      (`Put ${value?.nft?.nft_name} NFT on sale ${moment(value?.createdAt).fromNow()}.`)
 
                      : (null)
                     
                     }
                 />
 
                 <ActivityCard
                 nftId = {value?.nft?._id}
                 linkKey={value?.nft?._id}
                   eth_price={value?.nft_price}
                   src={ process.env.NEXT_PUBLIC_PINATA_BASE_URL + value?.nft?.profile_image}
                   text={value?.nft?.nft_name.length > 15 ?  value?.nft?.nft_name.slice(0, 15)+ '...' : value?.nft?.nft_name}
                   price={converter( value?.nft_price,"wei", "eth" )}
                   collectionName={!value?.collection?.collection_name ? "Untitled Collection" : value?.collection?.collection_name}
                   onSale={value?.put_on_sale}
                   isOnSale
                 />
               </TimelineContent>
 
               </Grid>
                 
               );
       
             })}
             </Grid>
           </TimelineItem>
         </Timeline>
        ) :  (
          <Box display="flex" justifyContent="center" width="100%">
            <Image
              alt="cover"
              src="/assets/images/svgs/noData.svg"
              sx={{
                width: "270px",
                height: "auto",
                mt: 6,
              }}
            />
          </Box>
        ) }
       
      </Container>
    </>
  );
}

export default Activity;
