const palette = {
  slimyGreen: "#099F31",
  nonPhotoBlue: "#AEEBFF",
  vividBlueSky: "#24c9ff",

  transparent: "rgba(0,0,0,0)",
  white: "#FFF",
  black: "#000",

  lighterGrey: "#f8f8f8",
  lightGrey: "#efefef",
  lightishGrey: "#ddd",
  mediumLightGrey: "#B6ACA6",
  mediumGrey: "#5a5a5a",
  mediumDarkGrey: "#767676",
  darkGrey: "#2e2e2e",
  darkerGrey: "#0e0e0e",

  // @deprecated
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary500: "#145C9E",

  secondary500: "#41476E",
  tertiary: "#18F2B2",

  accent100: "#FFEED4",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
};

const coloursLight = {
  text: palette.black,
  heading: palette.darkGrey,
  headerBackground: palette.slimyGreen,
  headerItems: palette.white,
  background: palette.lightGrey,
  buttonBackground: palette.slimyGreen,
  buttonText: palette.white,

  ratingItemBackground: palette.white,
  ratingItemDetailBackground: palette.lighterGrey,
  ratingItemDetailBorder: palette.lightishGrey,
  ratingItemBorder: palette.mediumLightGrey,
  searchBarBackground: palette.white,
  searchBarItems: palette.black,
  searchBarActiveItem: palette.slimyGreen,
  searchIcon: palette.mediumGrey,
  searchPlaceholder: palette.mediumGrey,
  textInputBackground: palette.white,
  textInputPlaceholder: palette.mediumGrey,
  statusBarBackground: palette.lightGrey,
};

const coloursDark = {
  text: palette.white,
  heading: palette.lightGrey,
  headerBackground: palette.slimyGreen,
  headerItems: palette.white,
  background: palette.darkerGrey,
  buttonBackground: palette.slimyGreen,
  buttonText: palette.white,

  ratingItemBackground: palette.mediumGrey,
  ratingItemDetailBackground: palette.darkGrey,
  ratingItemDetailBorder: palette.darkGrey,
  ratingItemBorder: palette.mediumLightGrey,
  searchBarBackground: palette.darkGrey,
  searchBarItems: palette.lightGrey,
  searchBarActiveItem: palette.slimyGreen,
  searchIcon: palette.lightGrey,
  searchPlaceholder: palette.lightGrey,
  textInputBackground: palette.mediumGrey,
  textInputPlaceholder: palette.white,
  statusBarBackground: palette.darkerGrey,
};

export const getColors = (darkMode: boolean) => {
  const colors = darkMode ? coloursDark : coloursLight;

  return {
    palette, // @deprecated
    transparent: "rgba(0, 0, 0, 0)",
    ...colors,
  };
};

export const colors = getColors(false);
