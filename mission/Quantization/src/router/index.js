/**
 * Created by zhongdong on 2024/3/10
 * Url :
 */
import { createBrowserRouter } from 'react-router-dom'
import Strategy from '../page/strategy'

const router = createBrowserRouter([
  {
    path: 'strategy',
    element: <Strategy/>,
  },
])

export default router
