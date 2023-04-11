import React, { useEffect, useState } from "react";
// layouts
import Layout from "../src/layouts";
// components
import { Page } from "../src/components";
// mui

// components
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../src/sections/nfts/NFTCreation"),
  { ssr: false }
);
import { LoadingModal } from "src/components/shared";
import { useAppContext } from "/src/context-api/appContext";
import changeAddress from "src/utils/changeAddress";
import { useRouter } from "next/router";
import { getUserCookie } from "src/utils/getCookies";
// ----------------------------------------------------------------------

export default function CreateNFT({ value, setValue }) {
  const { dispatch } = useAppContext();
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingText, setLoadingText] = useState("Account switching...");
  const token = getUserCookie();
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);

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
        <DynamicComponentWithNoSSR />
      </Page>{" "}
      <LoadingModal openSuccessModal={loadingModal} text={loadingText} />
    </>
  );
}

// ----------------------------------------------------------------------

CreateNFT.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
