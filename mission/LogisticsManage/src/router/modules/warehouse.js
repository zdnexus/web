/**
 * Created by zhongdong on 2023/8/26
 * Url :
 */

import Layout from '@/layout'

export default {
  path: '/warehouse',
  component: Layout,
  meta: {
    title: '仓库管理',
    icon: 'list',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [
    {
      path: '/warehouse/map',
      component: () => import('@/views/warehouse/map'),
      meta: { title: '仓库示意图', icon: 'edit' }
    },
    {
      path: '/warehouse/warehouse',
      component: () => import('@/views/warehouse/warehouse'),
      meta: { title: '仓库管理', icon: 'edit' }
    },
  ]
}
