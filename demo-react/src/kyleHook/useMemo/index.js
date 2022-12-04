import { useState, useEffect, useMemo } from 'react'


const slowFunction = (num) => {
  for (let i = 0; i < 999999999; i++) {
  }
  return num * 2
}

const App = () => {
  const [num, setNum] = useState(0)
  const [dark, setDark] = useState(false)
  
  const doubleNum = slowFunction(num)
  const themeStyles = {
    backgroundColor: dark ? 'black' : 'white',
    color: dark ? 'white' : 'black'
  }
  
  return (
    <div className='app'>
      <input type='number' value={num} onChange={e => setNum(parseInt(e.target.value))}/>
      <button onClick={() => setDark(!dark)}>change theme</button>
      <h1>{doubleNum}</h1>
      <h2 style={themeStyles}>useMemo</h2>
    </div>
  )
}

const App2 = () => {
  const [num, setNum] = useState(0)
  const [dark, setDark] = useState(false)
  
  // 其他组件的刷新避免slowFunction慢速度的影响
  const doubleNum = useMemo(() => {
    return slowFunction(num)
  }, [num])
  
  // 每次返回而且使用最新的对象
  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white' : 'black'
    }
  }, [dark])
  
  useEffect(() => {
    console.log('themeStyles change')
  }, [themeStyles])
  
  return (
    <div className='app'>
      <input type='number' value={num} onChange={e => setNum(parseInt(e.target.value))}/>
      <button onClick={() => setDark(!dark)}>change theme</button>
      <h1>{doubleNum}</h1>
      <h2 style={themeStyles}>useMemo</h2>
    </div>
  )
}

export default App
