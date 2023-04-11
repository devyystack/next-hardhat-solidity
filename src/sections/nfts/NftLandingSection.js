// import React from "react";
// //mui
// import { Box, Grid, Container, Typography, Button, Link } from "@mui/material";

// import CircularProgress from "@mui/material/CircularProgress";

// // common
// import {
//   CardHeading,
//   CardHeadingGradient,
//   TrandingNft,
//   DropDownMarks,
// } from "../../components/shared";
// import { NFT } from "src/components/nft";
// import ExoloreNftHeader from "./ExoloreNftHeader";
// // routes
// import Routes from "src/routes";
// import { dehydrate, QueryClient, useQuery } from "react-query";
// import { GetAllNft } from "../../apis";

// export default function NftLandingSection({
//   isSimpleHeading,
//   isExplore,
//   isHeading,
//   isSubheading,
//   isLoadMore,
//   isFilters,
// }) {
//   const { data, isLoading } = useQuery("data", GetAllNft);
//   const [nftData, setNftData] = React.useState([]);

//   React.useEffect(() => {
//     if (data?.data?.data?.length > 0) {
//       setNftData(data?.data?.data?.data);
//     } else {
//       return;
//     }
//   }, [data]);

//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     if (data) {
//       setLoading(false);
//     }
//   }, [data]);

//   return (
//     <Container
//       maxWidth={false}
//       sx={{
//         boxShadow: (theme) => ({
//           xs: 0,
//         }),
//         maxWidth: "1300px",
//         pt: "120px",
//         pb: "130px",
//       }}
//     >
//       <Box
//         sx={{
//           width: "auto",
//           height: "auto",
//           justifyContent: "space-between",
//           display: "flex",
//           overflow: "hidden",
//           alignItems: "center",
//         }}
//       >
//         {isHeading &&
//           (isSimpleHeading ? (
//             <ExoloreNftHeader heading="Explore" subHeading="Explore All" />
//           ) : (
//             <CardHeadingGradient text="Explore NFTs" />
//           ))}
//       </Box>
//       {isSubheading && (
//         <Box maxWidth="700px" pt="24px">
//           <Typography variant="h3Light">
//             Explore all nfts. You can view and explore NFTs related to multiple
//             categories here.
//           </Typography>
//         </Box>
//       )}
//       {isFilters && (
//         <Grid container mt={10}>
//           <Grid item xs={12} sm={8}>
//             <Grid container spacing={2}>
//               <Grid item>
//                 <TrandingNft
//                   isIcon={true}
//                   src="/assets/images/svgs/top.svg"
//                   text="Trending NFTs"
//                 />
//               </Grid>
//               <Grid item>
//                 {/* <TrandingNft text="Select Category" /> */}
//                 <DropDownMarks
//                   isIcon={true}
//                   src="/assets/images/svgs/select.svg"
//                   text="Select Category"
//                   data={[
//                     "Art",
//                     "Collectibles",
//                     "Domain Names",
//                     "Music",
//                     "Sports",
//                     "Trading Cards",
//                   ]}
//                 />
//               </Grid>
//               <Grid item>
//                 <TrandingNft
//                   isIcon={true}
//                   src="/assets/images/svgs/dollar.svg"
//                   text="Price"
//                 />
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             sm={4}
//             display="flex"
//             justifyContent={{ md: "flex-end", sm: "flex-start" }}
//             paddingTop={{ xs: "15px", sm: "0px" }}
//           >
//             <TrandingNft
//               isIcon={true}
//               src="/assets/images/svgs/filter.svg"
//               text="Add Filters"
//             />
//           </Grid>
//         </Grid>
//       )}

//       {!isLoadMore ? (
//         <Grid container spacing={1} mt={isFilters ? 2 : 10}>
//           {data?.data?.data.slice(0, 12).map((value, index) => {
//             let activity = value?.activity;
//             //  console.log("value?.nft_likes", value?.nft_likes);
//             return (
//               <Grid item xs={12} md={3} key={index}>
//                 <NFT
//                   nftId={value?._id}
//                   linkKey={value?._id}
//                   src={
//                     process.env.NEXT_PUBLIC_PINATA_BASE_URL +
//                     value?.profile_image
//                   }
//                   name={value?.nft_name}
//                   price={activity?.nft_price}
//                   likes={value?.nft_likes}
//                 />
//               </Grid>
//             );
//           })}
//         </Grid>
//       ) : (
//         <Grid container spacing={1} mt={isFilters ? 2 : 10}>
//           {isLoading ? (
//             <CircularProgress
//               sx={{
//                 display: "inline-block",
//                 position: "relative",
//                 justifyContent: "center",
//                 marginLeft: "50%",
//               }}
//             />
//           ) : (
//             data?.data?.data.map((value, index) => {
//               let activity = value?.activity;

//               return (
//                 <Grid item xs={12} md={3} key={index}>
//                   <NFT
//                     nftId={value?._id}
//                     linkKey={value?._id}
//                     src={
//                       process.env.NEXT_PUBLIC_PINATA_BASE_URL +
//                       value?.profile_image
//                     }
//                     name={value?.nft_name}
//                     price={activity?.nft_price}
//                     likes={value?.nft_likes}
//                   />
//                 </Grid>
//               );
//             })
//           )}
//         </Grid>
//       )}
//     </Container>
//   );
// }
