import React, { useEffect, useState } from "react";
// layouts
import Layout from "../src/layouts";
// components
import { Page } from "../src/components";

// mui

//Context provider
// import {AppWrapper} from '../src/context-api/appContext';

// components
import { NoteAbleNft } from "../src/components/noteable";
import {
  CustomSlider,
  AuctionSlider,
  NftLandingExplore,
  CollectionCategories,
  TrendingSection,
} from "../src/sections";

import { HottestBids } from "../src/components/hottest-bids";
import { LoadingModal } from "src/components/shared";
import { useAppContext } from "/src/context-api/appContext";
import changeAddress from "src/utils/changeAddress";

import {LoginForm} from "../src/components/admin";

// ----------------------------------------------------------------------

export default function HomePage({ value, setValue }) {
  const { dispatch } = useAppContext();
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingText, setLoadingText] = useState("Account switching...");

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
      <Page title="DStage - NFT Marketplace">
        <CustomSlider />
        <NoteAbleNft isLoadMore/>
        <HottestBids />
        <AuctionSlider />
        <TrendingSection />
        <NftLandingExplore isSimpleHeading isExplore isHeading />
        <CollectionCategories />
      </Page>
      <LoadingModal openSuccessModal={loadingModal} text={loadingText} />
    </>
  );
}

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
  return (
    <>
      <Layout>{page}</Layout>;
    </>
  );
};
