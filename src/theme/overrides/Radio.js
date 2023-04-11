//
import { RadioIcon, RadioCheckedIcon } from './CustomIcons';

// ----------------------------------------------------------------------

export default function Radio(theme) {
  return {
    MuiRadio: {
      defaultProps: {
        icon: <RadioIcon />,
        checkedIcon: <RadioCheckedIcon />,
      },

      styleOverrides: {
        root: {
          padding: theme.spacing(1),
          svg: {
            fontSize: 24,
            '&[font-size=small]': {
              fontSize: 20,
            },
          },
        },
      },
    },
  };
}
