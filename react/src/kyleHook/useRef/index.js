import { useState, useEffect, useRef } from 'react'


const App = () => {
  const [name, setName] = useState('')
  const renderCount = useRef(0)
  
  useEffect(() => {
    renderCount.current += 1
  })
  
  return (
    <div className='app'>
      <input value={name} onChange={e => setName(e.target.value.trim())}/>
      <h3>my name is {name}</h3>
      <h4>{renderCount.current} renders</h4>
    </div>
  )
}

const App2 = () => {
  const [name, setName] = useState('')
  const inputRef = useRef()
  
  const focus = () => {
    inputRef.current.focus()
    // 禁止使用ref操作dom的值，name不会变成someValue
    inputRef.current.value = 'someValue'
  }
  
  return (
    <div className='app'>
      <input ref={inputRef} value={name} onChange={e => setName(e.target.value.trim())}/>
      <h3>my name is {name}</h3>
      <button onClick={focus}>focus input</button>
    </div>
  )
}

const App3 = () => {
  const [name, setName] = useState('')
  const prevName = useRef('')
  
  useEffect(() => {
    prevName.current = name
  }, [name])
  
  return (
    <div className='app'>
      <input value={name} onChange={e => setName(e.target.value.trim())}/>
      <h3>my name is {name} and prevName is {prevName.current}</h3>
    </div>
  )
}

export default App3
