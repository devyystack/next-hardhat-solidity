import React, { useEffect, useState } from "react";
// layouts
import Layout from "../../../../src/layouts";
// components
import { Page } from "../../../../src/components";

import {
    ConsumersProfile
  } from "../../../../src/sections";


// ----------------------------------------------------------------------

export default function AdminHomePage() {

    return (
        <>
            <Page title="DStage - Admin">
                <ConsumersProfile/>
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
