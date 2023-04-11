import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  keyword: PropTypes.string,
};

export default function SearchNotFound({ keyword = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not Found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for
        <strong>{` ${keyword} `}</strong>.<br /> Try checking for typos or using complete words.
      </Typography>
    </Paper>
  );
}
