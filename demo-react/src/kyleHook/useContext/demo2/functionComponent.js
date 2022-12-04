import React from 'react'

import { useProvider } from './provider'

const themeStyles = (dark) => {
  return {
    backgroundColor: dark ? '#333' : '#CCC',
    color: dark ? '#CCC' : '#333',
    padding: '2rem',
    margin: dark ? '2rem' : '1rem'
  }
}

const FunctionComponent = () => {
  const provider = useProvider()
  const dark = provider.ThemeContext
  const toggleTheme = provider.ThemeContextChange
  
  return (
    <>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <div style={themeStyles(dark)}>Function Theme</div>
    </>
  )
}

export default FunctionComponent