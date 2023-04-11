import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Dot.propTypes = {
  size: PropTypes.number,
  sx: PropTypes.object,
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error']),
};

function Dot({ size = 24, color = 'primary', sx }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        zIndex: 10,
        position: 'absolute',
        borderRadius: '50%',
        background: (theme) => theme.palette.gradients[color],
        boxShadow: (theme) => `inset 0px -2px 4px ${theme.palette[color].darker}`,
        ...sx,
      }}
    />
  );
}

export default memo(Dot);
