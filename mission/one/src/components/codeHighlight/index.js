/**
 * Created by zhongdong on 2023/2/26
 * Url :
 */
import { useState, useEffect, useRef } from 'react'

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/atom-one-dark.css'

import './index.scss'

hljs.registerLanguage('javascript', javascript)

const code =
  'function  $_OurTechnology ( user,  api )  {\n' +
  '    try  {\n' +
  '        if  ( api.search( /makeMoney/ )  >=  0 )\n' +
  '            return process( user,  api ,  true )\n' +
  '    }  catch (e)  {\n' +
  '         console.log( \'Please request info quickly\' )\n' +
  '    }\n' +
  '}\n'

const CodeHighlight = () => {
  const [codeShow, setCodeShow] = useState('')
  const renderCountRef = useRef(1)
  
  useEffect(() => {
    setTimeout(() => {
      if (codeShow === code) {
        setCodeShow('')
        renderCountRef.current = 1
      } else {
        setCodeShow(code.substr(0, renderCountRef.current))
        renderCountRef.current++
      }
    }, 100)
  }, [codeShow])
  
  const highlightedCode = hljs.highlight(codeShow, { language: 'javascript' }).value
  return (
    <pre>
       <code className='hljs'>
         <div dangerouslySetInnerHTML={{ __html: highlightedCode }}/>
       </code>
    </pre>
  )
}

export default CodeHighlight