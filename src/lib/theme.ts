const DARK_THEME = 'dark'
export const setDarkTheme: (x: boolean) => void = (dark) => {
    if (dark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', DARK_THEME)
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.removeItem('theme')
    }
}
export const getTheme: () => boolean = () => {
    if (
        localStorage.theme! === DARK_THEME ||
        (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        document.documentElement.classList.add('dark')
        return true
    } else {
        document.documentElement.classList.remove('dark')
        return false
    }
}
