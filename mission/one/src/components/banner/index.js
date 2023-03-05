/**
 * Created by zhongdong on 2023/2/25
 * Url :
 */

import RequestInfoBtn from '@/components/request-info-btn'
import './index.scss'

const Banner = () => {
  return (
    <div id='banner'>
      <h1>The future of <br/>automated investment <br/>for digital assets</h1>
      <p>Autonomous is a technology powered investment platform for digital assets. We offer institutional-grade multi-strategy investment solutions and scalable trading
        technology infrastructure.</p>
      <RequestInfoBtn/>
      <div className='bg'/>
    </div>
  )
}


export default Banner
