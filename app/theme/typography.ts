// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native";
import {
  SpaceGrotesk_300Light as spaceGroteskLight,
  SpaceGrotesk_400Regular as spaceGroteskRegular,
  SpaceGrotesk_500Medium as spaceGroteskMedium,
  SpaceGrotesk_600SemiBold as spaceGroteskSemiBold,
  SpaceGrotesk_700Bold as spaceGroteskBold,
} from "@expo-google-fonts/space-grotesk";
import {
  Roboto_100Thin as roboto100Thin,
  Roboto_100Thin_Italic as roboto100ThinItalic,
  Roboto_300Light as roboto300Light,
  Roboto_300Light_Italic as roboto300LightItalic,
  Roboto_400Regular as roboto400Regular,
  Roboto_400Regular_Italic as roboto400RegularItalic,
  Roboto_500Medium as roboto500Medium,
  Roboto_500Medium_Italic as roboto500MediumItalic,
  Roboto_700Bold as roboto700Bold,
  Roboto_700Bold_Italic as roboto700BoldItalic,
  Roboto_900Black as roboto900Black,
  Roboto_900Black_Italic as roboto900BlackItalic,
} from "@expo-google-fonts/roboto";

export const customFontsToLoad = {
  spaceGroteskLight,
  spaceGroteskRegular,
  spaceGroteskMedium,
  spaceGroteskSemiBold,
  spaceGroteskBold,
  roboto100Thin,
  roboto100ThinItalic,
  roboto300Light,
  roboto300LightItalic,
  roboto400Regular,
  roboto400RegularItalic,
  roboto500Medium,
  roboto500MediumItalic,
  roboto700Bold,
  roboto700BoldItalic,
  roboto900Black,
  roboto900BlackItalic,
};

const fonts = {
  spaceGrotesk: {
    // Cross-platform Google font.
    light: "spaceGroteskLight",
    normal: "spaceGroteskRegular",
    medium: "spaceGroteskMedium",
    semiBold: "spaceGroteskSemiBold",
    bold: "spaceGroteskBold",
  },
  roboto: {
    // Cross-platform Google font.
    light: "roboto300Light",
    normal: "roboto400Regular",
    medium: "roboto500Medium",
    semiBold: "roboto700Bold",
    bold: "roboto900Black",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
};

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.spaceGrotesk,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
};
