

import React, { useEffect } from "react";
import { Container, Card, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PageTabs } from "../../components/admin";
import { useRouter } from "next/router";
import {
  NftsList,
  CollectionsList,
  ConsumersList,
  RecurringRevenueSection,
 Home, Settings} from "../../sections";
import { useAppContext } from "src/context-api/appContext";


export default function AdminTabs() {
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const { state , dispatch} = useAppContext();


  const handleChange = async (event, newValue) => {
    setValue(newValue);
  };


  const lists = [
    { text: "Home", src: "/assets/images/svgs/onsale.svg" },

    { text: "NFTs", src: "/assets/images/svgs/owned.svg" },
    {
      text: "Collections",
      src: "/assets/images/svgs/collection.svg",
    },
    {
      text: "Consumers",
      src: "/assets/images/svgs/favourite.svg",
    },
    { text: "Revenue", src: "/assets/images/svgs/activity.svg" },
    { text: "Settings", src: "/assets/images/svgs/activity.svg" },
  ];
  useEffect(() => {
    if (router.query.tab === lists[0].text) {
      setValue(0);
    } else if (router.query.tab === lists[1].text) {
      setValue(1);
    } else if (router.query.tab === lists[2].text) {  // clear filters states...

      dispatch({ type: "CLEAR_ALL", value: true });
      dispatch({ type: "SALE_FILTER", value: [] });
      dispatch({ type: "APPLY_FILTER", value: [] });
      dispatch({ type: "TRENDING_FILTER", value: false });

      setValue(2);
    } else if (router.query.tab === lists[3].text) {
      setValue(3);
    }
    else if (router.query.tab === lists[4].text) {
      setValue(4);
    }
    else if (router.query.tab === lists[5].text) {
      setValue(5);
    }
  }, [router.query.tab]);
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1300px",
        position: "relative",
        pt: "120px",
      }}
    >
      <Box>
        <PageTabs lists={lists} handle={handleChange} value={value} />
        {(router.query.tab === lists[0].text ||
          router.query.tab === undefined) && <Home />}
        {router.query.tab === lists[1].text && <NftsList />} 
        {router.query.tab === lists[2].text && <CollectionsList />}
        {router.query.tab === lists[3].text && <ConsumersList />}
        {router.query.tab === lists[4].text && <RecurringRevenueSection />}
        {router.query.tab === lists[5].text &&  <Settings />}
       
      </Box>
    </Container>
  );
}


