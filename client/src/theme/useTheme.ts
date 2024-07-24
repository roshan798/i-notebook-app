import { createTheme } from '@mui/material'
import { useState } from 'react'
import { colors } from '@mui/material'

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
    }

}
const useTheme = () => {
    const preferedTheme = localStorage.getItem('prefered-theme') as
        | 'light'
        | 'dark'
    const [mode, setMode] = useState<'light' | 'dark'>(
        preferedTheme != undefined ? preferedTheme : 'light'
    )
    const toggleMode = () => {
        setMode((prevMode) => {
            if (prevMode === 'light') {
                localStorage.setItem('prefered-theme', 'dark')
                return 'dark'
            } else {
                localStorage.setItem('prefered-theme', 'light')
                return 'light'
            }
        })
    }

    const theme = createTheme({
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
            }
        },
    })

    return { mode, toggleMode, theme }
}
export default useTheme
