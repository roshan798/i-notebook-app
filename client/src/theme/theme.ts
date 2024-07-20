import { PaletteMode } from "@mui/material";
import { blue, teal } from "@mui/material/colors";

const theme = {
  palette: {
    primary: teal,
  },
};

// for using custome pallete
export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
        primary: teal,
      }
      : {
        primary: blue
      }),
  },
});

export default theme;