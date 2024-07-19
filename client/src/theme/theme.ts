import { PaletteMode } from "@mui/material";

// Default theme export for light mode
export const theme = {
  palette: {
    mode: "light",
  },
};

// Function to get design tokens based on palette mode (light/dark)
export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
  },
});