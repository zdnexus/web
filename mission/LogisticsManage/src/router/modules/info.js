/**
 * Created by zhongdong on 2023/8/26
 * Url :
 */

import Layout from '@/layout'

export default {
  path: '/info',
  component: Layout,
  meta: {
    title: '公共信息管理',
    icon: 'list',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [
    {
      path: '/info/abroad-cost',
      component: () => import('@/views/info/abroad-cost'),
      meta: { title: '境外清关公司信息管理', icon: 'edit' }
    },
    {
      path: '/info/cost',
      component: () => import('@/views/info/cost'),
      meta: { title: '费用项管理', icon: 'edit' }
    },
    {
      path: '/info/pay-way',
      component: () => import('@/views/info/pay-way'),
      meta: { title: '支付方式', icon: 'edit' }
    },
  ]
}
