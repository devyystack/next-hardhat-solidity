// ----------------------------------------------------------------------

export default function Timeline(theme) {
  return {
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },

    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          width: 1,
          backgroundColor: theme.palette.divider,
        },
      },
    },
  };
}
