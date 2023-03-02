/**
 * Created by zhongdong on 2023/2/25
 * Url :
 */

import './index.scss'
import RequestInfoBtn from '../request-info-btn'

const Navigation = ({ click, setClick }) => {
  return (
    <nav id='navigation' style={{ position: click ? 'fixed' : 'absolute' }}>
      <div className='logo'/>
      <div className='text'>
        <label onClick={() => setClick(!click)}>
          {
            click ?
              <svg width="18" height="18" viewBox="0 0 18 18">
                <polyline fill="none" stroke="currentColor"
                          stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="2 3, 16 15">
                </polyline>
                <polyline fill="none" stroke="currentColor"
                          stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="2 15, 16 3">
                </polyline>
              </svg>
              :
              <svg id="open" width="18" height="18" viewBox="0 0 18 18">
                <polyline fill="none" stroke="currentColor"
                          stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="2 1, 16 1">
                </polyline>
                <polyline fill="none" stroke="currentColor"
                          stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="2 6, 16 6">
                </polyline>
                <polyline fill="none" stroke="currentColor"
                          stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="2 11, 16 11">
                </polyline>
              </svg>
          }
        </label>
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
