import { pxToRem, responsiveFontSizes } from '../utils/getFontValue';
// ----------------------------------------------------------------------
//const FONT_PRIMARY = 'Poppins, sans-serif';
const FONT_PRIMARY = 'Helvetica';
const FONT_SECONDARY = 'Barlow, sans-serif';
const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightSemiBold: 600,
  fontWeightMedium: 700,
  h1: {
    fontFamily: FONT_PRIMARY,
    fontWeight: 700,
    lineHeight: 74 / 56,
    fontSize: pxToRem(44),
    ...responsiveFontSizes({ xs: 34, sm: 40, md: 50, lg: 56 }),
  },
  h2: {
    fontFamily: FONT_PRIMARY,
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },

  topHeading: {
    fontFamily: FONT_PRIMARY,
    fontWeight: 500,
    lineHeight: 64 / 48,
    fontSize: pxToRem(30),
    ...responsiveFontSizes({ sm: 38, md: 42, lg: 44 }),
  },

  h3: {
    fontFamily: FONT_PRIMARY,
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h3Light: {
    fontFamily: FONT_PRIMARY,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 16, md: 20, lg: 20 }),
    fontWeight: 400,
  },

  h3LightTable: {
    fontFamily: FONT_PRIMARY,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 16, md: 18, lg: 18 }),
    fontWeight: 600,
  },

  h3Lightest: {
    fontFamily: FONT_PRIMARY,
    lineHeight: 1.5,
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ sm: 12, md: 12, lg: 16 }),
    fontWeight: 400,
  },
  h4: {
    fontFamily: FONT_PRIMARY,
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h4Light: {
    fontFamily: FONT_PRIMARY,
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontFamily: FONT_PRIMARY,
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 18, md: 20, lg: 20 }),
  },
  h5Light: {
    fontFamily: FONT_PRIMARY,
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 18, md: 20, lg: 20 }),
  },
  h6: {
    fontFamily: FONT_PRIMARY,
    fontWeight: 600,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 28 / 16,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 26 / 14,
    fontSize: pxToRem(14),
  },
  subtitle3: {
    fontWeight: 600,
    lineHeight: 24 / 13,
    fontSize: pxToRem(13),
  },
  subtitle4: {
    fontWeight: 400,
    fontSize: pxToRem(14),
  },
  body0: {
    lineHeight: 30 / 20,
    fontSize: pxToRem(20),
  },
  body1: {
    lineHeight: 28 / 16,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 26 / 14,
    fontSize: pxToRem(14),
  },
  body3: {
    lineHeight: 24 / 13,
    fontSize: pxToRem(13),
  },

  body4: {
    fontWeight: 500,
    fontSize: pxToRem(18),
  },
  body5: {
    fontWeight: 400,
    fontSize: pxToRem(18),
  },

  body6: {
    fontWeight: 400,
    fontSize: pxToRem(16),
  },

  caption: {
    lineHeight: 20 / 12,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 600,
    lineHeight: 20 / 12,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 600,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
};
export default typography;
