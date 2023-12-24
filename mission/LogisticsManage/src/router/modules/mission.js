/**
 * Created by zhongdong on 2023/8/26
 * Url :
 */

import Layout from '@/layout'

export default {
  path: '/mission',
  component: Layout,
  meta: { title: '任务管理', icon: 'list' },
  children: [
    {
      path: 'allocation',
      component: () => import('@/views/mission/allocation'),
      meta: { title: '待办任务', icon: 'edit' }
    },
    {
      path: 'history',
      component: () => import('@/views/mission/history'),
      meta: { title: '历史任务', icon: 'form' }
    }
  ]
}
