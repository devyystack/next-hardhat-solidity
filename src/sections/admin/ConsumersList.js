
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import Image from "src/components/Image";
import searchIcon from "@iconify/icons-carbon/search";
import { Iconify } from "../../components";
import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, Link, Button, TextField , InputAdornment,} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  CardHeading,
} from "../../components/shared";
import { GetConsumersList } from "../../apis";
import {ConsumersTable} from "../../components/admin";
import { useAppContext } from "src/context-api/appContext";


//mui

// import CircularProgress from "@mui/material/CircularProgress";

import { getUserCookie } from "../../utils/getCookies";

import { queryParamFormatter } from "../../utils/queryStringFormetter";

// common


// routes
import Routes from "src/routes";



function ConsumersList() {
  const { state, dispatch } = useAppContext();

  // const [payload, setPayload] = React.useState({});
  const [userData, setUserData] = React.useState([]);

  const getConsumers = async()=> {

  const payloadData={
    skip:0,
  }
  // setPayload(payloadData);
    const result = await GetConsumersList(queryParamFormatter(payloadData));
    if(result?.data?.data){
      setUserData(result?.data?.data);
      dispatch({type: "CONSUMER_DATA", value: result?.data?.data})
    }

  }

 React.useEffect(async () => {

   await getConsumers();
 },[])



  const theme = useTheme();
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1300px",
        mt: "60px",
        mb: "120px",

        height: "auto",
      }}
    >
      <Box
        sx={{
          width: "auto",
          height: "auto",
          justifyContent: "space-between",
          display: "flex",
          overflow: "hidden",
          alignItems: "center",
        }}
      >
        <CardHeading text="Consumers Listings" />
      </Box>

      <Box maxWidth="500px" pt="12px" pb="12px">
        <Typography variant="h3Lightest">
        See all the details related to your users and keep track of them. You can 
        view all the users of your marketplace here.
          
        </Typography>
      </Box>

      

      <Box width="100%" height="auto" mt={6}>
       <ConsumersTable/>
      </Box>


     

  
    </Container>
  );
}

export default ConsumersList;

