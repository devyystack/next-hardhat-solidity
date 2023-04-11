// ----------------------------------------------------------------------

export default function Progress(theme) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          overflow: 'hidden',
        },
        bar: {
          borderRadius: 6,
          backgroundColor: theme.palette.brandpurple.primary,
        },
        colorPrimary: {
          // backgroundColor: theme.palette.primary[isLight ? 'lighter' : 'darker'],
          backgroundColor: '#fff',
        },
        buffer: {
          backgroundColor: 'transparent',
        },
      },
    },
  };
}
