import PropTypes from 'prop-types';
// icons
import closeIcon from '@iconify/icons-carbon/close';
import resetIcon from '@iconify/icons-carbon/reset';
// @mui
import { Typography, Stack } from '@mui/material';
//
import Iconify from '../Iconify';
import { IconButtonAnimate } from '../animate';

// ----------------------------------------------------------------------

HeaderSetting.propTypes = {
  notDefault: PropTypes.bool,
  onReset: PropTypes.func,
  onToggle: PropTypes.func,
};

export default function HeaderSetting({ notDefault, onReset, onToggle }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2, px: 3 }}>
      <Typography variant="h6">Settings</Typography>
      <div>
        {notDefault && (
          <IconButtonAnimate onClick={onReset}>
            <Iconify icon={resetIcon} sx={{ width: 20, height: 20 }} />
          </IconButtonAnimate>
        )}
        <IconButtonAnimate onClick={onToggle}>
          <Iconify icon={closeIcon} sx={{ width: 20, height: 20 }} />
        </IconButtonAnimate>
      </div>
    </Stack>
  );
}
