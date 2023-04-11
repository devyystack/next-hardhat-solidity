// icons
import favoriteIcon from '@iconify/icons-carbon/favorite';
import favoriteFilled from '@iconify/icons-carbon/favorite-filled';
// @mui
import { Checkbox } from '@mui/material';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

export default function FavoriteButton({ ...other }) {
  return (
    <Checkbox
      color="error"
      icon={<Iconify icon={favoriteIcon} sx={{ width: 20, height: 20 }} />}
      checkedIcon={<Iconify icon={favoriteFilled} sx={{ width: 20, height: 20 }} />}
      {...other}
    />
  );
}
