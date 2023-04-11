// API
// ----------------------------------------------------------------------

export const HOST_API = {
  local: process.env.NEXT_PUBLIC_BACKEND_URL,
  dev: process.env.NEXT_PUBLIC_BACKEND_URL,
  production: process.env.NEXT_PUBLIC_BACKEND_URL,
};
export const STAGE_PERCENTAGE = 2.5;
export const GOOGLE_API = process.env.GOOGLE_API;
export const CONTAINER_WIDTH = process.env.CONTAINER_WIDTH;
export const ERC_721 = "721";
export const ERC_1155 = "1155";
export const STAGE_BID_PERCENTAGE = 10;

// DEFAULT LOCALE
// ----------------------------------------------------------------------
// Also change in next.config.mjs

export const defaultLocale = "en";

// SETTINGS
// ----------------------------------------------------------------------

export const defaultSettings = {
  // light | dark
  themeMode: "light",
  // ltr | rtl
  themeDirection: "ltr",
  //  default | blueOrange | greenOrange | purpleTeal | cyanYellow | pinkCyan
  themeColorPresets: "default",
};

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER_MOBILE_HEIGHT = 64;
export const HEADER_DESKTOP_HEIGHT = 96;
export const DRAWER_WIDTH = 280;
