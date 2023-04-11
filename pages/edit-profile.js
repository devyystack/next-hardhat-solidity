import React, { useEffect, useState } from "react";
// layouts
import Layout from "../src/layouts";
// components
import { Page } from "../src/components";
// mui

// components
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../src/sections/profile/EditProfile"),
  { ssr: false }
);
import { LoadingModal } from "src/components/shared";
import { useAppContext } from "/src/context-api/appContext";
import changeAddress from "src/utils/changeAddress";
import { useRouter } from "next/router";
import { getUserCookie } from "src/utils/getCookies";
// ----------------------------------------------------------------------

export default function EditProfilePage({ value, setValue }) {
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

  console.log("edit-profile page...");
  return (
    <>
      <Page title="Profile Edit | DStage - NFT Marketplace">
        <DynamicComponentWithNoSSR />
      </Page>{" "}
      <LoadingModal openSuccessModal={loadingModal} text={loadingText} />
    </>
  );
}

// ----------------------------------------------------------------------

EditProfilePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
