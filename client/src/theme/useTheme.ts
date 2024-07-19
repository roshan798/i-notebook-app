import { useState, useMemo } from "react";
import { PaletteMode, createTheme } from "@mui/material";
// import theme from "./theme";
import  { getDesignTokens } from "./theme";
const useTheme = () => {
    const [mode, setMode] = useState<PaletteMode>(localStorage.getItem("theme") as "light") || "light";
    const toggleMode = () => {
        setMode((prev) => {
            const newMode = prev === "light" ? "dark" : "light";
            localStorage.setItem("theme", newMode);
            return newMode;
        }
        );
    }
    // const modifiedTheme = useMemo(
    //     () =>
    //         createTheme({
    //             ...theme,
    //             palette: {
    //                 ...theme.palette,
    //                 mode,
    //             },
    //         }),
    //     [mode]
    // );
    const modifiedTheme = useMemo(
        () => createTheme(getDesignTokens(mode)),
        [mode]
    );
    return { mode, toggleMode, theme: modifiedTheme }
}
export default useTheme;