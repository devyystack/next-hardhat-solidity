//
import { AutocompleteIcon } from './CustomIcons';

// ----------------------------------------------------------------------

export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      defaultProps: {
        popupIcon: <AutocompleteIcon />,
      },

      styleOverrides: {
        inputRoot: {
          color: theme.palette.brandblack.primary,
          // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
          '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
            // Default left padding is 6px
            //paddingLeft: 26,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.brandpurple.primary,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.brandpurple.primary,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.brandpurple.primary,
          },
        },
        paper: {
          // paddingLeft: theme.spacing(1),
          // paddingRight: theme.spacing(1),
          boxShadow: theme.customShadows.z24,
          borderRadius: Number(theme.shape.borderRadius) * 2,
        },
        option: {
          ...theme.typography.body2,
          borderRadius: theme.shape.borderRadius,
          fontSize: '14px',
          lineHeight: '28px',
          fontWeight: '700',
        },
      },
    },
  };
}
