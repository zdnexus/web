/**
 * Created by zhongdong on 2023/8/26
 * Url :
 */

import Layout from '@/layout'

export default {
  path: '/transport',
  component: Layout,
  name: '货运部门',
  meta: {
    title: '货运部门',
    icon: 'list',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [
    {
      path: '/transport/order',
      name: '订单管理',
      meta: { title: '订单管理', icon: 'edit' },
      component: () => import('@/views/link'),
      children: [
        {
          path: '/transport/order/allocation',
          name: '待分配订单',
          component: () => import('@/views/transport/order/allocation'),
          meta: { title: '待分配订单', icon: 'edit' }
        },
        {
          path: '/transport/order/incomplete',
          name: '进行中订单',
          component: () => import('@/views/transport/order/incomplete'),
          meta: { title: '进行中订单', icon: 'edit' }
        },
        {
          path: '/transport/order/complete',
          name: '已完成订单',
          component: () => import('@/views/transport/order/complete'),
          meta: { title: '已完成订单', icon: 'edit' }
        },
        {
          path: '/transport/order/expire',
          name: '已失效订单',
          component: () => import('@/views/transport/order/expire'),
          meta: { title: '已失效订单', icon: 'edit' }
        }
      ]
    },
    {
      path: '/transport/transport',
      name: '货运管理',
      meta: { title: '货运管理', icon: 'edit' },
      component: () => import('@/views/link'),
      children: [
        {
          path: '/transport/transport/entry',
          name: '入境车辆',
          component: () => import('@/views/transport/transport/entry'),
          meta: { title: '入境车辆', icon: 'edit' }
        },
        {
          path: '/transport/transport/inventory',
          name: '库存车辆',
          component: () => import('@/views/transport/transport/inventory'),
          meta: { title: '库存车辆', icon: 'edit' }
        },
        {
          path: '/transport/transport/exit',
          name: '出境车辆',
          component: () => import('@/views/transport/transport/exit'),
          meta: { title: '出境车辆', icon: 'edit' }
        }
      ]
    },
    {
      path: '/transport/cost',
      name: '费用核算',
      meta: { title: '费用核算', icon: 'edit' },
      component: () => import('@/views/transport/cost')
    },
    {
      path: '/transport/cooperate',
      name: '合作方管理',
      meta: { title: '合作方管理', icon: 'edit' },
      component: () => import('@/views/link'),
      children: [
        {
          path: '/transport/cooperate/custom',
          name: '客户信息管理',
          component: () => import('@/views/transport/cooperate/custom'),
          meta: { title: '客户信息管理', icon: 'edit' }
        },
        {
          path: '/transport/cooperate/china-vehicle',
          name: '中方车辆信息管理',
          component: () => import('@/views/transport/cooperate/china-vehicle'),
          meta: { title: '中方车辆信息管理', icon: 'edit' }
        },
        {
          path: '/transport/cooperate/china-driver',
          name: '中方司机信息管理',
          component: () => import('@/views/transport/cooperate/china-driver'),
          meta: { title: '中方司机信息管理', icon: 'edit' }
        },
        {
          path: '/transport/cooperate/load',
          name: '装卸队信息管理',
          component: () => import('@/views/transport/cooperate/load'),
          meta: { title: '装卸队信息管理', icon: 'edit' }
        },
        {
          path: '/transport/cooperate/abroad-vehicle',
          name: '境外车辆信息管理',
          component: () => import('@/views/transport/cooperate/abroad-vehicle'),
          meta: { title: '境外车辆信息管理', icon: 'edit' }
        },
        {
          path: '/transport/cooperate/abroad-driver',
          name: '境外司机信息管理',
          component: () => import('@/views/transport/cooperate/abroad-driver'),
          meta: { title: '境外司机信息管理', icon: 'edit' }
        }
      ]
    },
    {
      path: '/transport/parameter',
      name: '参数管理',
      meta: { title: '参数管理', icon: 'edit' },
      component: () => import('@/views/link'),
      children: [
        {
          path: '/transport/parameter/warehouse',
          name: '仓库管理',
          component: () => import('@/views/transport/parameter/warehouse'),
          meta: { title: '仓库管理', icon: 'edit' }
        }
      ]
    },
    {
      path: '/transport/count',
      name: '统计报表',
      meta: { title: '统计报表', icon: 'edit' },
      component: () => import('@/views/link'),
      children: [
        {
          path: '/transport/count/warehouse',
          name: '仓库库存统计报表',
          component: () => import('@/views/transport/count/warehouse'),
          meta: { title: '仓库库存统计报表', icon: 'edit' }
        },
        {
          path: '/transport/count/yesterdayRevenue',
          name: '昨日营收统计',
          component: () => import('@/views/transport/count/yesterdayRevenue'),
          meta: { title: '昨日营收统计', icon: 'edit' }
        },
        {
          path: '/transport/count/monthRevenue',
          name: '月度营收统计',
          component: () => import('@/views/transport/count/monthRevenue'),
          meta: { title: '月度营收统计', icon: 'edit' }
        }
      ]
    }
  ]
}
