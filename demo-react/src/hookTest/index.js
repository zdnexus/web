import { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } from 'react'


const Count = ({ data }) => {
  return (
    <i>{data}</i>
  )
}

const HookTest = () => {
  console.log('HookTest')
  
  // 自变量
  const [x, setX] = useState(0)
  const renderCountRef = useRef(1)
  const isOdd = renderCountRef.current % 2 === 1
  
  // 因变量
  const changeX = () => {
    setX(x + 1)
    renderCountRef.current++
  }
  const y = 2 * x + 1
  
  // 无副作用的因变量，使用useCallback和useMemo
  // const changeX = useCallback(() => setX(x + 1), [x])
  // const y = useMemo(() => 2 * x + 1, [x])
  
  // 有副作用的因变量，使用useEffect
  useEffect(() => {
    document.title = x
  }, [x])
  
  return (
    <div className='hook-test'>
      <button onClick={changeX}>点我+1</button>
      {
        isOdd ? <p>x是<Count data={x}/></p> : null
      }
      <p>y是<Count data={y}/></p>
    </div>
  )
}

export default HookTest
