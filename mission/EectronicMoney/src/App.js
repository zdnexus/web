import { useState } from 'react'
import Navigation from '@/components/navigation'
import Banner from '@/components/banner'
import Content from '@/components/content'
import Footer from '@/components/footer'
import Cover from '@/components/cover'

const App = () => {
  const [click, setClick] = useState(false)
  
  return (
    <>
      <Navigation click={click} setClick={setClick}/>
      <Banner/>
      <Content/>
      <Footer/>
      <Cover click={click} setClick={setClick}/>
    </>
  )
}

export default App
