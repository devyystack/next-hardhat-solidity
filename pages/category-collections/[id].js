import React, { useEffect, useState } from "react";
// layouts
import Layout from "../../src/layouts";
// components
import { Page } from "../../src/components";
import { ExploreSpecificCollection } from "../../src/sections";
import { LoadingModal } from "src/components/shared";
import { useAppContext } from "/src/context-api/appContext";
import changeAddress from "src/utils/changeAddress";
import { GetCollectionWithCategories} from "../../src/apis";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

export default function CollectionCategoryPage({ value, setValue }) {

    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState("");
  
    useEffect(async () => {
      const result = await GetCollectionWithCategories(id);
      setData(result?.data);
    }, [id]);

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
      <Page title="Collection Category | DStage - NFT Marketplace">
        <ExploreSpecificCollection collectionData={data} />
      </Page>{" "}
      <LoadingModal openSuccessModal={loadingModal} text={loadingText} />
    </>
  );
}

// ----------------------------------------------------------------------

CollectionCategoryPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
