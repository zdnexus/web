import React, { useContext } from 'react'

import { ThemeContext } from './index'

const themeStyles = (dark) => {
  return {
    backgroundColor: dark ? '#333' : '#CCC',
    color: dark ? '#CCC' : '#333',
    padding: '2rem',
    margin: dark ? '2rem' : '1rem'
  }
}

const FunctionComponent = () => {
  const dark = useContext(ThemeContext)
  return (
    <div style={themeStyles(dark)}>Function Theme</div>
  )
}

export default FunctionComponent