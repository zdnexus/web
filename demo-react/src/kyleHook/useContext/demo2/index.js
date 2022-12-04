import React from 'react'

import Provider from './provider'
import FunctionComponent from './functionComponent'

const App = () => {
  return (
    <div className='app'>
      <Provider>
        <FunctionComponent/>
      </Provider>
    </div>
  )
}

export default App
