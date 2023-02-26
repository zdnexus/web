/**
 * Created by zhongdong on 2023/2/25
 * Url :
 */

import './index.scss'
import RequestInfoBtn from '../request-info-btn'

const Navigation = () => {
  return (
    <nav id='navigation'>
      <div className='logo'/>
      <div className='text'>
        <ul>
          <li>
            <a href="#c1">Solutions</a>
          </li>
          <li>
            <a href="#c3">About Us</a>
          </li>
        </ul>
      </div>
      <RequestInfoBtn/>
    </nav>
  )
}


export default Navigation
