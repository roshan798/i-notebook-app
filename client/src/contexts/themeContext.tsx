// src/themeContext.tsx
import { createContext, ReactNode, useState, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme } from '@mui/material';
import { colors } from '@mui/material';

const palette = {
    primary: colors.teal,
    secondary: colors.blueGrey,
    background: {
        light: '#FEFDED',
        dark: '#121212',
    },
    text: {
        light: '#000',
        dark: '#fff',
    },
};

export interface ThemeContextType {
    mode: 'light' | 'dark';
    toggleMode: () => void;
    theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleMode: () => { },
    theme: createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: colors.teal[500],
            },
            secondary: {
                main: colors.blueGrey[500],
            },
            background: {
                default: palette.background.light,
            },
        },
    }),
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const preferedTheme = localStorage.getItem('prefered-theme') as 'light' | 'dark';
    const [mode, setMode] = useState<'light' | 'dark'>(preferedTheme || 'light');

    const toggleMode = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('prefered-theme', newMode);
            return newMode;
        });
    };

    const theme = useMemo(() => createTheme({
        palette: {
            mode: mode,
            primary: {
                main: colors.teal[500],
            },
            secondary: {
                main: colors.blueGrey[500],
            },
            background: {
                default: palette.background[mode],
            },
        },
    }), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleMode, theme }}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
