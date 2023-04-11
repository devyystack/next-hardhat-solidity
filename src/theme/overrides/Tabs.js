// ----------------------------------------------------------------------

export default function Tabs(theme) {
  return {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },

      styleOverrides: {
        root: {
          padding: 0,
          minWidth: 48,
          ...theme.typography.body5,
          color: theme.palette.brandblack.primary,
          minHeight: 60,
          '&.Mui-selected': {
            color: theme.palette.brandblack.primary,
            fontWeight: theme.typography.fontWeightSemiBold,
          },
          '&:not(:last-of-type)': {
            marginRight: theme.spacing(3),
            '@media (min-width: 600px)': {
              marginRight: theme.spacing(5),
            },
          },
        },
        labelIcon: {
          // maxHeight: 20,
          flexDirection: 'row',
          '& > *:first-of-type': {
            marginBottom: 0,
            marginRight: theme.spacing(1),
          },
        },
        wrapper: {
          flexDirection: 'row',
          whiteSpace: 'nowrap',
        },
        textColorInherit: {
          opacity: 1,
          color: theme.palette.brandblack.primary,
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiTabScrollButton: {
      styleOverrides: {
        root: {
          width: 48,
          borderRadius: '50%',
        },
      },
    },
  };
}
