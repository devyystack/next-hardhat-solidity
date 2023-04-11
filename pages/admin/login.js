import React, { useEffect, useState } from "react";
// layouts
import Layout from "../../src/layouts";
// components
import { Page } from "../../src/components";

// mui

// components
// import { NoteAbleNft } from "../src/components/noteable";
// import {
//     CustomSlider,
//     AuctionSlider,
//     NftLandingExplore,
//     CollectionCategories,
//     TrendingSection,
// } from "../src/sections";

// import { HottestBids } from "../src/components/hottest-bids";


import { LoginForm } from "../../src/components/admin";

// ----------------------------------------------------------------------

export default function AdminLoginPage() {

    return (
        <>
            <Page title="DStage - Admin">
                <LoginForm />
            </Page>

        </>
    );
}

// ----------------------------------------------------------------------

AdminLoginPage.getLayout = function getLayout(page) {
    return (
            <Layout disabledFooter disabledHeader>{page}</Layout>
        
    );
};
