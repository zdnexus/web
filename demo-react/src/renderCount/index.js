import { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } from 'react'

const RenderCount = () => {
  console.log('RenderCount')
  const [name, setName] = useState('')
  
  useEffect(() => {
  })
  
  return (
    <div className='render-count'>
      <input value={name} onChange={e => setName(e.target.value)}/>
      <p>my name is {name}</p>
    </div>
  )
}

export default RenderCount
