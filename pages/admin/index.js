import React, { useEffect, useState } from "react";
// layouts
import Layout from "../../src/layouts";
// components
import { Page } from "../../src/components";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { AdminTabs } from "../../src/sections";
import { getUserCookie } from "../../src/utils/getCookies";

// ----------------------------------------------------------------------

export default function AdminHomePage() {
  const cookie = getUserCookie();
  return (
    <>
      <Page title="DStage - Admin">
        <AdminTabs />
      </Page>
      {/* {cookie ? <Page title="DStage - Admin">
                <AdminTabs />
            </Page> : <Box height="80vh" width="100%" display="flex" justifyContent="center" alignItems="center">
                <CircularProgress color="primary" />
            </Box>} */}
    </>
  );
}

// ----------------------------------------------------------------------

AdminHomePage.getLayout = function getLayout(page) {
  return (
    <>
      <Layout adminSimpleHeader disabledFooter>
        {page}
      </Layout>
      ;
    </>
  );
};
