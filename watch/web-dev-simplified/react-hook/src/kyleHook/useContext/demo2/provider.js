import React, { useContext, useState } from 'react'

const ThemeContext = React.createContext(null)
const ThemeContextChange = React.createContext(null)

export const useProvider = () => {
  return {
    ThemeContext: useContext(ThemeContext),
    ThemeContextChange: useContext(ThemeContextChange)
  }
}

const Provider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(true)
  
  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }
  
  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeContextChange.Provider value={toggleTheme}>
        {children}
      </ThemeContextChange.Provider>
    </ThemeContext.Provider>
  )
}

export default Provider
