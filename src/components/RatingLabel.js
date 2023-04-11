import PropTypes from 'prop-types';
// icons
import starFilled from '@iconify/icons-carbon/star-filled';
// @mui
import { Typography, Stack, Link } from '@mui/material';
// utils
import { fShortenNumber } from '../utils/formatNumber';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

RatingLabel.propTypes = {
  ratings: PropTypes.number.isRequired,
  reviews: PropTypes.number,
};

export default function RatingLabel({ reviews, ratings, ...other }) {
  return (
    <Stack spacing={0.5} direction="row" alignItems="center" {...other}>
      <Iconify icon={starFilled} sx={{ width: 20, height: 20, color: 'warning.main' }} />
      <Typography variant="h6">{Number.isInteger(ratings) ? `${ratings}.0` : ratings}</Typography>

      {reviews && (
        <Link variant="body2" sx={{ color: 'text.secondary' }}>
          ({fShortenNumber(reviews)} reviews)
        </Link>
      )}
    </Stack>
  );
}
