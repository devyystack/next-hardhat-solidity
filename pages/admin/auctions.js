import React, { useEffect, useState } from "react";
// layouts
import Layout from "../../src/layouts";
// components
import { Page } from "../../src/components";

import {
    LiveAuctions
  } from "../../src/sections";


// ----------------------------------------------------------------------

export default function AdminHomePage() {

    return (
        <>
            <Page title="DStage - Admin">
                <LiveAuctions/>
            </Page>

        </>
    );
}

// ----------------------------------------------------------------------

AdminHomePage.getLayout = function getLayout(page) {
    return (
        <>
            <Layout adminSimpleHeader disabledFooter>{page}</Layout>;
        </>
    );
};
