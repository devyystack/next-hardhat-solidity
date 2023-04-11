import React, { useEffect } from "react";
import PropTypes from "prop-types";
// next
import dynamic from "next/dynamic";
//
const Header = dynamic(() => import("./header/Header"), { ssr: false });

const AdminHeader = dynamic(() => import("./header/AdminHeader"), { ssr: false });

const HeaderSimple = dynamic(() => import("./header/HeaderSimple"), {
  ssr: false,
});
const Footer = dynamic(() => import("./footer/Footer"), { ssr: false });
const FooterSimple = dynamic(() => import("./footer/FooterSimple"), {
  ssr: false,
});

// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node,
  disabledFooter: PropTypes.bool,
  disabledHeader: PropTypes.bool,
  simpleFooter: PropTypes.bool,
  simpleHeader: PropTypes.bool,
  transparentHeader: PropTypes.bool,
};

export default function Layout({
  children,
  transparentHeader,
  disabledHeader,
  disabledFooter,
  simpleHeader,
  simpleFooter,
  adminSimpleHeader,
}) {
  return (
    <>
      {disabledHeader ? null : (
        <>
          {simpleHeader ? (
            <HeaderSimple transparent={transparentHeader} />
          ) : adminSimpleHeader ? (
            <AdminHeader transparent={transparentHeader} />
          )

            : (
              <Header transparent={transparentHeader} />
            )}
        </>
      )}

      {children}

      {disabledFooter ? null : (
        <>{simpleFooter ? <FooterSimple /> : <Footer />}</>
      )}
    </>
  );
}
