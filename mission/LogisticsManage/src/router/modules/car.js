/**
 * Created by zhongdong on 2023/8/26
 * Url :
 */

import Layout from '@/layout'

export default {
  path: '/car',
  component: Layout,
  meta: {
    title: '商品车部门', icon: 'list', roles: ['admin']
  },
  children: [
    {
      path: '/car/order',
      meta: { title: '订单管理', icon: 'edit' },
      component: () => import('@/views/link'),
      children: [
        {
          path: '/car/order/allocation',
          component: () => import('@/views/car/order/allocation'),
          meta: { title: '待分配订单', icon: 'edit' }
        },
        {
          path: '/car/order/incomplete',
          component: () => import('@/views/car/order/incomplete'),
          meta: { title: '未完成订单', icon: 'edit' }
        },
        {
          path: '/car/order/complete',
          component: () => import('@/views/car/order/complete'),
          meta: { title: '已完成订单', icon: 'edit' }
        },
        {
          path: '/car/order/expire',
          component: () => import('@/views/car/order/expire'),
          meta: { title: '已失效订单', icon: 'edit' }
        }
      ]
    },
    {
      path: '/car/car',
      meta: { title: '车辆管理', icon: 'edit' },
      component: () => import('@/views/link'),
      children: [
        {
          path: '/car/car/toBeStored',
          component: () => import('@/views/car/car/toBeStored'),
          meta: { title: '待入库车辆', icon: 'edit' }
        },
        {
          path: '/car/car/inventory',
          component: () => import('@/views/car/car/inventory'),
          meta: { title: '库存车辆', icon: 'edit' }
        },
        {
          path: '/car/car/exit',
          component: () => import('@/views/car/car/exit'),
          meta: { title: '已出境车辆', icon: 'edit' }
        },
        {
          path: '/car/car/damage',
          component: () => import('@/views/car/car/damage'),
          meta: { title: '有损车辆', icon: 'edit' }
        }
      ]
    },
    {
      path: '/car/cost',
      meta: { title: '费用核算', icon: 'edit' },
      component: () => import('@/views/car/cost'),
    },
    {
      path: '/car/cooperate',
      meta: { title: '合作方管理', icon: 'edit' },
      component: () => import('@/views/link'),
      children: [
        {
          path: '/car/cooperate/custom',
          component: () => import('@/views/car/cooperate/custom'),
          meta: { title: '客户信息管理', icon: 'edit' }
        },
        {
          path: '/car/cooperate/domestic',
          component: () => import('@/views/car/cooperate/domestic'),
          meta: { title: '境内送车司机信息管理', icon: 'edit' }
        },
        {
          path: '/car/cooperate/abroad',
          component: () => import('@/views/car/cooperate/abroad'),
          meta: { title: '境外车队信息管理', icon: 'edit' }
        },
      ]
    },
    {
      path: '/car/parameter',
      name: '参数管理',
      meta: { title: '参数管理', icon: 'edit' },
      component: () => import('@/views/link'),
      children: [
        {
          path: '/car/parameter/server',
          name: '服务项管理',
          component: () => import('@/views/car/parameter/server'),
          meta: { title: '服务项管理', icon: 'edit' }
        },
        {
          path: '/car/parameter/warehouse',
          name: '仓库管理',
          component: () => import('@/views/car/parameter/warehouse'),
          meta: { title: '仓库管理', icon: 'edit' }
        },
        {
          path: '/car/parameter/car-brand',
          name: '车型品牌管理',
          component: () => import('@/views/car/parameter/car-brand'),
          meta: { title: '车型品牌管理', icon: 'edit' }
        },
        {
          path: '/car/parameter/key',
          name: '钥匙位置管理',
          component: () => import('@/views/car/parameter/key'),
          meta: { title: '钥匙位置管理', icon: 'edit' }
        },
        {
          path: '/car/parameter/car-model',
          name: '车辆型号管理',
          component: () => import('@/views/car/parameter/car-model'),
          meta: { title: '车辆型号管理', icon: 'edit' }
        },
      ]
    },
    {
      path: '/car/count',
      meta: { title: '统计报表', icon: 'edit' },
      component: () => import('@/views/link'),
      children: [
        {
          path: '/car/count/warehouse',
          component: () => import('@/views/car/count/warehouse'),
          meta: { title: '仓库库存统计报表', icon: 'edit' }
        },
        {
          path: '/car/count/yesterdayRevenue',
          component: () => import('@/views/car/count/yesterdayRevenue'),
          meta: { title: '昨日营收统计', icon: 'edit' }
        },
        {
          path: '/car/count/monthRevenue',
          component: () => import('@/views/car/count/monthRevenue'),
          meta: { title: '月度营收统计', icon: 'edit' }
        },
      ]
    },
  ]
}
