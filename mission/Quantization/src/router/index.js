/**
 * Created by zhongdong on 2024/3/10
 * Url :
 */
import { createHashRouter } from 'react-router-dom'
import Strategy from '@/page/strategy'

const router = createHashRouter([
  {
    path: 'strategy',
    element: <Strategy/>,
  },
])

export default router
