/**
 * Created by zhongdong on 2023/8/26
 * Url :
 */

import Layout from '@/layout'

export default {
  path: '/mission',
  name: '任务管理',
  component: Layout,
  meta: {
    title: '任务管理',
    icon: 'list',
    roles: ['admin']
  },
  children: [
    {
      path: 'allocation',
      name: '待办任务',
      component: () => import('@/views/mission/allocation'),
      meta: { title: '待办任务', icon: 'edit' }
    },
    {
      path: 'history',
      name: '历史任务',
      component: () => import('@/views/mission/history'),
      meta: { title: '历史任务', icon: 'form' }
    }
  ]
}
