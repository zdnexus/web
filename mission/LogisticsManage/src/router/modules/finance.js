/**
 * Created by zhongdong on 2023/8/26
 * Url :
 */

import Layout from '@/layout'

export default {
  path: '/finance',
  component: Layout,
  meta: {
    title: '财务管理',
    icon: 'list',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [
    {
      path: '/finance/invoice',
      component: () => import('@/views/finance/invoice'),
      meta: { title: '财务开票', icon: 'edit' }
    },
    {
      path: '/finance/pay',
      component: () => import('@/views/finance/pay'),
      meta: { title: '财务付款', icon: 'edit' }
    },
    {
      path: '/finance/form',
      component: () => import('@/views/finance/form'),
      meta: { title: '财务报表', icon: 'edit' }
    }
  ]
}
