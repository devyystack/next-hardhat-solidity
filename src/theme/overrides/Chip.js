// @mui

//
import { CloseIcon } from './CustomIcons';

// ----------------------------------------------------------------------

export default function Chip(theme) {
  return {
    MuiChip: {
      defaultProps: {
        deleteIcon: CloseIcon,
      },

      styleOverrides: {
        root: {
          ...theme.typography.body3,
          borderRadius: theme.shape.borderRadius,
          height: 'auto',
          minHeight: '60px',
          minWidth: '150px',
          backgroundColor: '#F7F3FF',
          borderLeft: '5px solid #692ADC',
        },
        label: {
          width: '100%',
        },
        colorDefault: {
          color: theme.palette.brandblack.primary,
          '& .MuiChip-avatarMedium, .MuiChip-avatarSmall': {
            color: theme.palette.brandblack.primary,
          },
        },
        outlined: {
          borderColor: theme.palette.grey[500_32],
          '&.MuiChip-colorPrimary': {
            borderColor: theme.palette.primary.main,
          },
          '&.MuiChip-colorSecondary': {
            borderColor: theme.palette.secondary.main,
          },
        },
        //
        avatar: {
          fontSize: theme.typography.subtitle2.fontSize,
          fontWeight: theme.typography.subtitle2.fontWeight,
        },
        avatarColorInfo: {
          color: theme.palette.info.contrastText,
          backgroundColor: theme.palette.info.dark,
        },
        avatarColorSuccess: {
          color: theme.palette.success.contrastText,
          backgroundColor: theme.palette.success.dark,
        },
        avatarColorWarning: {
          color: theme.palette.warning.contrastText,
          backgroundColor: theme.palette.warning.dark,
        },
        avatarColorError: {
          color: theme.palette.error.contrastText,
          backgroundColor: theme.palette.error.dark,
        },
      },
    },
  };
}
