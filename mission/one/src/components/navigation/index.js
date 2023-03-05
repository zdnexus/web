/**
 * Created by zhongdong on 2023/2/25
 * Url :
 */

import RequestInfoBtn from '@/components/request-info-btn'
import './index.scss'

const Navigation = ({ click, setClick }) => {
  return (
    <nav id='navigation' style={{ position: click ? 'fixed' : 'absolute' }}>
      <img className='logo' src={require('@/img/logo@2x.png')}/>
      <div className='text'>
        <label onClick={() => setClick(!click)}>
          {
            click ?
              <svg width="18" height="18" viewBox="0 0 18 18">
                <polyline fill="none" stroke="currentColor"
                          strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" points="2 3, 16 15">
                </polyline>
                <polyline fill="none" stroke="currentColor"
                          strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" points="2 15, 16 3">
                </polyline>
              </svg>
              :
              <svg id="open" width="18" height="18" viewBox="0 0 18 18">
                <polyline fill="none" stroke="currentColor"
                          strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" points="2 1, 16 1">
                </polyline>
                <polyline fill="none" stroke="currentColor"
                          strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" points="2 6, 16 6">
                </polyline>
                <polyline fill="none" stroke="currentColor"
                          strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" points="2 11, 16 11">
                </polyline>
              </svg>
          }
        </label>
        <ul>
          <li>
            <a href="#c1">Solutions</a>
          </li>
          {/*<li>*/}
            {/*<a href="#c3">About Us</a>*/}
          {/*</li>*/}
        </ul>
      </div>
      <RequestInfoBtn/>
    </nav>
  )
}


export default Navigation
