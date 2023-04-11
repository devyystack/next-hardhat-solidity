import React, { useEffect, useState } from "react";
// layouts
import Layout from "../src/layouts";
// components
import { Page } from "../src/components";

import { CollectionExploreSection } from "../src/sections";
import { LoadingModal } from "src/components/shared";
import { useAppContext } from "/src/context-api/appContext";
import changeAddress from "src/utils/changeAddress";

// ----------------------------------------------------------------------

export default function CollectionExplorePage({ value, setValue }) {
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
      <Page title="Collection Explore | DStage - NFT Marketplace">
        <CollectionExploreSection isLoadMore />
      </Page>
      <LoadingModal openSuccessModal={loadingModal} text={loadingText} />
    </>
  );
}

// ----------------------------------------------------------------------

CollectionExplorePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
