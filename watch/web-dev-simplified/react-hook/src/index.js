import React from 'react'
import ReactDOM from 'react-dom/client'

import './css/index.css'
import reportWebVitals from './reportWebVitals'
// import App from './app'
// import App from './hookTest'
// import App from './renderCount'
import App from './kyleHook/useState'
// import App from './kyleHook/useEffect'
// import App from './kyleHook/useRef'
// import App from './kyleHook/useMemo'
// import App from './kyleHook/useContext/demo1'
// import App from './kyleHook/useContext/demo2'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
