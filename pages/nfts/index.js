import React, { useEffect, useState } from "react";
// layouts
import Layout from "../../src/layouts";
// components
import { Page } from "../../src/components";
// mui
import { Box } from "@mui/material";
// components
import { NftExploreSection } from "../../src/sections";
import { LoadingModal } from "src/components/shared";
import { useAppContext } from "/src/context-api/appContext";
import changeAddress from "src/utils/changeAddress";

// ----------------------------------------------------------------------

export default function NftExplorePage({ value, setValue }) {
  const { dispatch } = useAppContext();
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingText, setLoadingText] = useState("Account switching...");
  useEffect(async () => {
    if (value !== "") {
      setLoadingModal(true);
      const user = await changeAddress(value);
      dispatch({ type: "USER_DATA", value: user });
      setLoadingModal(false);
      setValue("");
    }
  }, [value]);
  return (
    <>
      <Page title="NFT Explore | DStage - NFT Marketplace">
        <NftExploreSection isSubheading isLoadMore isFilters isHeading />
      </Page>
      <LoadingModal openSuccessModal={loadingModal} text={loadingText} />
    </>
  );
}

// ----------------------------------------------------------------------

NftExplorePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
