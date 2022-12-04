import { useState, useEffect } from 'react'


const App = () => {
  console.log('render')
  
  const [type, setType] = useState('posts')
  const [num, setNum] = useState(0)
  
  // 每次render运行
  useEffect(() => {
    console.log('every render')
  })
  
  // 第一次render运行
  useEffect(() => {
    console.log('first render')
  }, [])
  
  // 改变type运行
  useEffect(() => {
    console.log('change type')
  }, [type])
  
  // 改变num运行
  useEffect(() => {
    console.log('change num')
  }, [num])
  
  return (
    <div className='app'>
      <button onClick={() => setType('posts')}>posts</button>
      <button onClick={() => setType('users')}>users</button>
      <button onClick={() => setType('comments')}>comments</button>
      <h1>{type}</h1>
      
      <button onClick={() => setNum(num + 1)}>nums</button>
      <h2>{num}</h2>
    </div>
  )
}

const App2 = () => {
  const [type, setType] = useState('posts')
  const [list, setList] = useState([])
  
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(response => response.json())
      .then(json => setList(json))
  }, [type])
  
  return (
    <div className='app'>
      <button onClick={() => setType('posts')}>posts</button>
      <button onClick={() => setType('users')}>users</button>
      <button onClick={() => setType('comments')}>comments</button>
      <h1>{type}</h1>
      {
        list.map(l => <pre>{JSON.stringify(l)}</pre>)
      }
    </div>
  )
}

const App3 = () => {
  const [winWidth, setWinWidth] = useState(window.innerWidth)
  
  const handleResize = () => {
    setWinWidth(window.innerWidth)
  }
  
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <div className='app'>
      <h1>{winWidth}</h1>
    </div>
  )
}

export default App
