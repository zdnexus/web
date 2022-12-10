import { useState } from 'react'


const App = () => {
  const [count, setCount] = useState(0)
  
  return (
    <div className='app'>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

const App2 = () => {
  const [count, setCount] = useState(0)
  
  const plus = () => {
    setCount(count + 1)
  }
  const minus = () => {
    setCount(count - 1)
  }
  
  return (
    <div className='app'>
      <button onClick={minus}>-</button>
      <span>{count}</span>
      <button onClick={plus}>+</button>
    </div>
  )
}

const App3 = () => {
  const [count, setCount] = useState(0)
  
  const plus = () => {
    setCount(preCount => preCount + 1)
  }
  const minus = () => {
    setCount(preCount => preCount - 1)
  }
  
  return (
    <div className='app'>
      <button onClick={minus}>-</button>
      <span>{count}</span>
      <button onClick={plus}>+</button>
    </div>
  )
}

const App4 = () => {
  const [count, setCount] = useState(0)
  
  const plus = () => {
    setCount(count + 1)
    setCount(count + 1)
  }
  const minus = () => {
    setCount(count - 1)
    setCount(count - 1)
  }
  
  return (
    <div className='app'>
      <button onClick={minus}>-</button>
      <span>{count}</span>
      <button onClick={plus}>+</button>
    </div>
  )
}


const App5 = () => {
  const [count, setCount] = useState(0)
  
  const plus = () => {
    setCount(preCount => preCount + 1)
    setCount(preCount => preCount + 1)
  }
  const minus = () => {
    setCount(preCount => preCount - 1)
    setCount(preCount => preCount - 1)
  }
  
  return (
    <div className='app'>
      <button onClick={minus}>-</button>
      <span>{count}</span>
      <button onClick={plus}>+</button>
    </div>
  )
}

const App6 = () => {
  const [obj, setObj] = useState({
    count: 0,
    theme: 'blue'
  })
  
  const plus = () => {
    setObj(preObj => {
      return {
        ...preObj,
        count: preObj.count + 1
      }
    })
  }
  const minus = () => {
    setObj(preObj => {
      return {
        ...preObj,
        count: preObj.count - 1
      }
    })
  }
  
  return (
    <div className='app'>
      <button onClick={minus}>-</button>
      <span>{obj.count}{obj.theme}</span>
      <button onClick={plus}>+</button>
    </div>
  )
}

// 性能优化1
const countInitial = () => {
  console.log('countInitial')
  return 0
}
const App7 = () => {
  const [count, setCount] = useState(() => {
    console.log('countInitial')
    return 0
  })
  // const [count, setCount] = useState(countInitial())
  // const [count, setCount] = useState(() => countInitial())
  
  const plus = () => {
    setCount(count + 1)
  }
  const minus = () => {
    setCount(count - 1)
  }
  
  return (
    <div className='app'>
      <button onClick={minus}>-</button>
      <span>{count}</span>
      <button onClick={plus}>+</button>
    </div>
  )
}

export default App
