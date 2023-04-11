import React, { useEffect, useState } from "react";
// layouts
import Layout from "../../src/layouts";
// components
import { Page } from "../../src/components";
// mui

// components
import { CollectionProfileSection } from "../../src/sections";
import { LoadingModal } from "src/components/shared";
import { useAppContext } from "/src/context-api/appContext";
import changeAddress from "src/utils/changeAddress";
import { useRouter } from "next/router";
import { converter } from "../../src/utils/ethConverter";
import { queryParamFormatter } from "../../src/utils/queryStringFormetter";



// api

import { GetCollectionByid } from "../../src/apis";
import { CoPresentOutlined } from "@mui/icons-material";

// ----------------------------------------------------------------------

export default function CollectionProfilePage({ value, setValue }) {

  const router = useRouter();
  const { id } = router.query;

  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingText, setLoadingText] = useState("Account switching...");
  const [payloadData, setPayloadData]= React.useState("");
  const [status, setStatus] = React.useState(false);
  const { dispatch, state } = useAppContext();
 
  React.useEffect(async() => {
    if(id){  
      const payload ={
        collectionId: id
      }
      setPayloadData(payload);
  
      if(state.priceFilter.min > 0 && state.priceFilter.max > 0){
        let convertedPrice = {
          min: parseInt(converter(state.priceFilter.min, "eth", "wei")),
          max: parseInt(converter(state.priceFilter.max, "eth", "wei")),
        };
        
        Object.assign(payload, {range: JSON.stringify(convertedPrice)});
      }
      const dataResult = await GetCollectionByid(queryParamFormatter(payload));
      const data = dataResult?.data?.data;
      dispatch({type:"COLLECTION_PROFILE",value:data});
    }
  },[id])


  const handleLoadingModalClose = () => {
    setLoadingModal(false);
  };
  useEffect(async () => {
    if (value !== "") {
      setLoadingModal(true);
      const user = await changeAddress(value);
      console.log(user);
      dispatch({ type: "USER_DATA", value: user });
      setLoadingModal(false);
      setValue("");
    }
  }, [value]);
  return (
    <>
      <Page title="Collection Profile | DStage - NFT Marketplace">
        <CollectionProfileSection isLoadMore />
      </Page>{" "}
      <LoadingModal openSuccessModal={loadingModal} text={loadingText} />
    </>
  );
}

// ----------------------------------------------------------------------

CollectionProfilePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
