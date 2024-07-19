import { createTheme, Theme, PaletteMode } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import useTheme from "./useTheme";

type ThemeContextType = {
    mode: PaletteMode;
    toggleMode: () => void;
    theme: Theme;
};

export const ThemeContext = createContext<ThemeContextType>({
    mode: "light",
    toggleMode: () => { },
    theme: createTheme(),
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const value = useTheme();
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    return useContext(ThemeContext);
};