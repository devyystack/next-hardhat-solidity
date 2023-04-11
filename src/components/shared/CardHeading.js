import { Typography } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';

function CardHeading({ text, children, isResponsive }) {
  const theme = useTheme();
  return (
    <Box>
      <Typography variant="h3" sx={{color: theme.palette.brandblack.primary }}>
        {text}
        {children}
      </Typography>
    </Box>
  );
}

export default CardHeading;
