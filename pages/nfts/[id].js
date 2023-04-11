import React, { useState, useEffect } from "react";
import { GetNftById } from "../../src/apis";

import { Page } from "../../src/components";
import { NftDetail } from "../../src/sections";
import { useRouter } from "next/router";
// layouts
import Layout from "../../src/layouts";
import { LoadingModal } from "src/components/shared";
import { useAppContext } from "/src/context-api/appContext";
import changeAddress from "src/utils/changeAddress";
export async function getServerSideProps(context) {
  const { id } = context.params;
  const result = await GetNftById(id);
  let data = result?.data?.data;
  return { props: { data: data } };
}

function NftDetailPage({ value, setValue, data }) {
  const { dispatch } = useAppContext();
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingText, setLoadingText] = useState("Account switching...");
  useEffect(() => {
    if (data.length > 0) {
      dispatch({ type: "NFT_DATA", value: data[0] });
    } else {
      dispatch({ type: "NFT_DATA", value: null });
    }
  }, [data]);
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
      <Page title="NFT Detail | DStage - NFT Marketplace">
        <NftDetail />
      </Page>
      <LoadingModal openSuccessModal={loadingModal} text={loadingText} />
    </>
  );
}

// ----------------------------------------------------------------------
NftDetailPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default NftDetailPage;
