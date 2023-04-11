// scroll bar
import "simplebar/src/simplebar.css";

// global sass

import "../src/styles/global.scss";

// lightbox
import "react-image-lightbox/style.css";

// slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";

// ----------------------------------------------------------------------

import { AppWrapper, useAppContext } from "../src/context-api/appContext";

import PropTypes from "prop-types";
// next
import Head from "next/head";
// @mui
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// contexts
import { SettingsProvider } from "../src/contexts/SettingsContext";
// theme
import ThemeProvider from "../src/theme";
// utils

// components
import RtlLayout from "../src/components/RtlLayout";
import ProgressBar from "../src/components/ProgressBar";
import ThemeColorPresets from "../src/components/ThemeColorPresets";
import MotionLazyContainer from "../src/components/animate/MotionLazyContainer";

// Toaster
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// React query
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const queryClient = React.useRef(new QueryClient());
  const [value, setValue] = React.useState("");

  const getLayout = Component.getLayout ?? ((page) => page);
  if (typeof window !== "undefined") {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", async (data) => {
        setValue(data[0]);
      });
    }
  }
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AppWrapper>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SettingsProvider>
            <ThemeProvider>
              <ThemeColorPresets>
                <MotionLazyContainer>
                  <RtlLayout>
                    <ProgressBar />
                    <QueryClientProvider client={queryClient.current}>
                      <Hydrate state={pageProps.dehydrationState}>
                        {getLayout(
                          <Component
                            {...pageProps}
                            value={value}
                            setValue={setValue}
                          />
                        )}
                      </Hydrate>
                    </QueryClientProvider>
                  </RtlLayout>
                </MotionLazyContainer>
              </ThemeColorPresets>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </AppWrapper>
      <ToastContainer closeButton={true} limit={1} position="top-right" />
    </>
  );
}
