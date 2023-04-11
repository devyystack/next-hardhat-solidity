import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Button(theme) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          color: isLight ? theme.palette.common.white : theme.palette.grey[800],
          background: theme.palette.gradients.buttongradient,
          '&:hover': {
            backgroundColor: isLight ? theme.palette.grey[700] : theme.palette.grey[400],
          },
        },
        outlinedInherit: {
          borderColor: theme.palette.brandblack.primary,
          border: '2px solid',
          color: theme.palette.brandblack.primary,
          '&:hover': {
            backgroundColor: theme.palette.lightblue.primary,
            borderColor: theme.palette.brandlightblue.primary,
            color: theme.palette.brandlightblue.primary,
          },
        },

        outlinedInherit2: {
          borderColor: 'transparent',
          border: '2px solid #FFFFFF ',
          color: 'transparent',

        },
        filledInherit: {
          backgroundColor: theme.palette.lightblue.primary,
          color: theme.palette.brandlightblue.primary,
          '&:hover': {
            borderColor: theme.palette.brandlightblue.primary,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
