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
                          strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" points="1 1, 17 17">
                </polyline>
                <polyline fill="none" stroke="currentColor"
                          strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" points="17 1, 1 17">
                </polyline>
              </svg>
              :
              <svg id="open" width="18" height="18" viewBox="0 0 18 18">
                <polyline fill="none" stroke="currentColor"
                          strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" points="1 1, 17 1">
                </polyline>
                <polyline fill="none" stroke="currentColor"
                          strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" points="1 9, 17 9">
                </polyline>
                <polyline fill="none" stroke="currentColor"
                          strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" points="1 17, 17 17">
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
