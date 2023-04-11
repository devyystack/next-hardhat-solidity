import React from 'react'

import PropTypes from 'prop-types';
import Head from 'next/head';
import { forwardRef } from 'react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const AdminPage = forwardRef(({ children, meta, title, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} `}</title>
      {meta}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

AdminPage.propTypes = {
  children: PropTypes.node.isRequired,
  meta: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default AdminPage;
