import React, { useState, useEffect } from 'react'
import { getTheme, setDarkTheme } from '@/lib/theme'
import { Moon, Sun } from 'lucide-react'
type Props = {}

function ThemeSwitch({}: Props) {
    const [darkMode, setDarkMode] = useState<boolean>(false)
    useEffect(() => {
        setDarkMode(getTheme())
    }, [])
    const handleSwitch = () => {
        setDarkMode(!darkMode)
        setDarkTheme(!darkMode)
    }

    return (
        <button
            data-testid="darkModeButton"
            className=""
            onClick={handleSwitch}
        >
            {!darkMode ? <Moon color="blue" /> : <Sun color="white" />}
        </button>
    )
}

export default ThemeSwitch
