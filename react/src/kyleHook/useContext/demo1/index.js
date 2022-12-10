import React, { useState } from 'react'

import FunctionComponent from './functionComponent'
import ClassComponent from './classComponent'

export const ThemeContext = React.createContext(null)

const App = () => {
  const [darkTheme, setDarkTheme] = useState(true)
  
  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }
  
  return (
    <div className='app'>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <ThemeContext.Provider value={darkTheme}>
        <ClassComponent/>
        <FunctionComponent/>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
