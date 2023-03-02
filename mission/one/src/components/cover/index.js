/**
 * Created by zhongdong on 2023/2/25
 * Url :
 */

import RequestInfoBtn from '../request-info-btn'
import './index.scss'

const Navigation = ({ click, setClick }) => (
  click ?
    <div id='cover'>
      <ul>
        <li>
          <a href="#c1" onClick={() => {
            setClick(false)
          }}>Solutions</a>
        </li>
        <li>
          <a href="#c3" onClick={() => {
            setClick(false)
          }}>About Us</a>
        </li>
      </ul>
      <RequestInfoBtn/>
    </div> : null
)


export default Navigation
