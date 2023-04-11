import { Typography } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';

function CardHeadingGradient({ text, children }) {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h1"
        sx={{
          background: '-webkit-linear-gradient(45deg, #692ADC 30%, #1ED7D9 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {text}
        {children}
      </Typography>
    </Box>
  );
}

export default CardHeadingGradient;
