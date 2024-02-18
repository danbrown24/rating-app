import { getColors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { timing } from "./timing";

export * from "./colors";
export * from "./spacing";
export * from "./typography";
export * from "./timing";

export const getTheme = (darkMode: boolean) => ({
  colors: getColors(darkMode),
  spacing,
  typography,
  timing,
});

export type Theme = ReturnType<typeof getTheme>;
