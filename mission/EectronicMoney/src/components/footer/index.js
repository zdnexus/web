/**
 * Created by zhongdong on 2023/2/25
 * Url :
 */

import './index.scss'

const footer = () => {
  return (
    <footer id='footer'>
      <img className='logo' src={require('@/img/logo@2x.png')}/>
      <div className='text'>
        <ul>
          <li>
            <a href="#c1">Solutions</a>
          </li>
          {/*<li>*/}
            {/*<a href="#c3">About Us</a>*/}
          {/*</li>*/}
        </ul>
      </div>
      <div className='p1'>Autonomous Limited</div>
      {/*<div className='p2'>12F Oriental Crystal Commercial Building, 46 Lyndhurst Terrace, Central, Hong Kong</div>*/}
      <div className='p3'>Copyright © 2021 - Autonomous - All Right Reserved  </div>
    </footer>
  )
}


export default footer
