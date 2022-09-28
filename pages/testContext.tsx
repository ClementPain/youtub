import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

const THEMES = {
  dark: {
    background: '#000',
    color: '#FFF',
    border: 'solid 1px #FFF'
  },
  light: {
    background: '#FFF',
    color: '#000',
    border: 'solid 1px #000'
  }
}

const ThemeContext = React.createContext({
  theme: THEMES.dark,
  toggleTheme: () => {}
})


function SearchForm() {
  return (
    <div>
      <input />
      <ThemedButton>Rechercher</ThemedButton>
    </div>
  )
}

function Toolbar() {
  return (
    <div>
      <SearchForm />
      <ThemedButton>M'inscrire</ThemedButton>
    </div>
  )
}

function ThemedButton ({children}: any) {
  const {theme} = useContext(ThemeContext)
  return (
    <button style={theme}>{children}</button>
  )
}

type ThemeValues = "light" | "dark"

function App () {
  const [theme, setTheme] = useState<ThemeValues>('dark')
  const toggleTheme = useCallback(function () {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }, [])

  const value = useMemo(function () {
    return {
      theme: theme === 'light' ? THEMES.light : THEMES.dark,
      toggleTheme
    }
  }, [toggleTheme, theme])

  return (
    <div>
      <ThemeContext.Provider value={value}>
        <Toolbar />
        <ThemeSwitcher />
      </ThemeContext.Provider>
    </div>
  )
}

function ThemeSwitcher()  {
  const { toggleTheme } = useContext(ThemeContext)

  return (
    <button onClick={toggleTheme}>Changer le theme</button>
  )
}

export default App