import React, { useEffect, useState } from "react";
// layouts
import Layout from "../../src/layouts";
// components
import { Page } from "../../src/components";
import dynamic from "next/dynamic";
// const DynamicComponentWithNoSSR = dynamic(
//   () => import("../src/sections/profile/UserProfile"),
//   { ssr: false }
// );
import { getUserByPublicAddressWithToken } from "../../src/apis";

import {UserProfile} from "../../src/sections";
import { LoadingModal } from "../../src/components/shared";
import { useAppContext } from "../../src/context-api/appContext";
import changeAddress from "src/utils/changeAddress";
import { getUserCookie } from "../../src/utils/getCookies";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

export default function MyProfilePage({ value, setValue }) {
  const { dispatch } = useAppContext();
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingText, setLoadingText] = useState("Account switching...");
  const token = getUserCookie();
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);

  const { id } = router.query;
  useEffect(async () => {
    const result = await getUserByPublicAddressWithToken(id, token);
    setData(result?.data?.data);
  }, [id]);

//   console.log("profile id data...", data);

 
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
      <Page title="My Profile | DStage - NFT Marketplace">
        <UserProfile isLoadMore data={data} id={id}/>
      </Page>
      <LoadingModal openSuccessModal={loadingModal} text={loadingText} />
    </>
  );
}

// ----------------------------------------------------------------------

MyProfilePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
