import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

CountUpNumber.propTypes = {
  threshold: PropTypes.number,
  sx: PropTypes.object,
};

export default function CountUpNumber({ threshold = 1, sx, ...other }) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <Box component="span" ref={ref} sx={sx}>
      {inView && <CountUp duration={1} {...other} />}
    </Box>
  );
}
