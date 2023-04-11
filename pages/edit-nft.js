import React, { useEffect, useState } from "react";
// layouts
import Layout from "../src/layouts";
// components
import { Page } from "../src/components";
// mui

// components
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../src/sections/nfts/NFTEdit"),
  { ssr: false }
);
import { useRouter } from "next/router";
import { getUserCookie } from "src/utils/getCookies";
// ----------------------------------------------------------------------

export default function EditNFT() {
  const token = getUserCookie();
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/404");
    }
  }, [token]);
  return <Page title="NFT Detail | DStage - NFT Marketplace">{/* <DynamicComponentWithNoSSR /> */}</Page>;
}

// ----------------------------------------------------------------------

EditNFT.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
