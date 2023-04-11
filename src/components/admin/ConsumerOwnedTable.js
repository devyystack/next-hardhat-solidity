


import * as React from 'react';
import moment from "moment";
import NextLink from "next/link";
import Routes from "src/routes";
import { Image } from "../../components";

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box, Typography, Avatar, Link, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ConsumerProfileAvatar } from "../../components/admin";
import PriceSection from "../../components/shared/PriceSection";
import { converter } from "../../utils/adminEthConvertor";



export default function ConsumerOwnedTable({ownedData}) {
    const theme = useTheme();

    return (

        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    height: 'auto',
                },
            }}
        >

            <Paper elevation={3}>
                {ownedData.length > 0 ? (
                      <Box width={'100%'} height='297px' px={'12px'} pl={6} pr={6} mt={3} mb={3} overflow="auto">

                      {Array.from(ownedData).map((value, index)=>{
                          let date = value?.createdAt;
                          let price = value?.nft_owners[0]?.nft_price
                          let collection = value?.collectionData[0]?.collection_name;
  
                          return(
                              <Box key={index} width={'100%'} maxHeight='60px' display={"flex"} flex-direction="row" justifyContent="space-between" mb={5}>
  
                              <Grid item md={3}>
                                  <Box width={'100%'} >
                                      {/* {moment().local().format(`DD MMM,HH:mm`)} */}
      
                                      <b> {moment(date).local().format(`DD MMM `)}</b>
                                      <br></br>
                                      <span sx={{ opacity: ".7" }}>
                                          {moment(date).local().format(`HH:mm`)}
      
      
                                      </span>
                                  </Box>
                              </Grid>
                              <Grid item lg={5}>
                                  <Box width={'100%'} display="flex" justifyContent="flex-start">
  
                                    
  
  
                                      <ConsumerProfileAvatar
                                      linkKey={value?._id}
                                                                          
                                          src={
  
                                              value?.image_type==="video" ? "/assets/images/svgs/video.svg" :
                                              process.env.NEXT_PUBLIC_PINATA_BASE_URL + value?.profile_image 
  
                                          }
      
                                          title={value?.nft_name}
      
                                          opacity
                                          slice
      
                                      />
  
                                    
                                  </Box>
                              </Grid>
                              <Grid item lg={1} display="flex" alignItems="center">
                                  <Box width={'100%'} >
                                   
                                  <PriceSection text={price!==null? converter(price , "wei", "eth") :0} />
      
      
                                  </Box>
                              </Grid>
                              <Grid item lg={5} display="flex" alignItems="center">
                                  <Box width="180px" height='auto' >
      
                                      <Typography noWrap variant="subtitle1">
                                     {collection ? collection : "Untitled Collection"}
      
                                      </Typography>
                                  </Box>
                              </Grid>
      
                          </Box>
  
                          )
  
                      })}
  
                  </Box>

                ) : (
                    <Box display="flex" justifyContent="center" width="100%">
					<Image
						alt="cover"
						src="/assets/images/svgs/noData.svg"
						sx={{
							mt: 4,
							width: "270px",
							height: "auto",
						}}
					/>
					</Box>
                ) }

              
                


            </Paper>
        </Box>

    )

};


