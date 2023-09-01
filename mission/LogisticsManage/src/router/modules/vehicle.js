/**
 * Created by zhongdong on 2023/8/26
 * Url :
 */

import Layout from '@/layout'

export default {
  path: '/vehicle',
  component: Layout,
  meta: {
    title: '商品车部门', icon: 'list', roles: ['admin']
  },
  children: [
    {
      path: '/vehicle/order',
      meta: { title: '订单管理', icon: 'edit' },
      component: () => import('@/views/link'),
      children: [
        {
          path: '/vehicle/order/allocation',
          component: () => import('@/views/vehicle/order/allocation'),
          meta: { title: '待分配订单', icon: 'edit' }
        },
        {
          path: '/vehicle/order/incomplete',
          component: () => import('@/views/vehicle/order/incomplete'),
          meta: { title: '未完成订单', icon: 'edit' }
        },
        {
          path: '/vehicle/order/complete',
          component: () => import('@/views/vehicle/order/complete'),
          meta: { title: '已完成订单', icon: 'edit' }
        },
        {
          path: '/vehicle/order/expire',
          component: () => import('@/views/vehicle/order/expire'),
          meta: { title: '已失效订单', icon: 'edit' }
        }
      ]
    },
    {
      path: '/vehicle/vehicle',
      meta: { title: '车辆管理', icon: 'edit' },
      component: () => import('@/views/link'),
      children: [
        {
          path: '/vehicle/vehicle/toBeStored',
          component: () => import('@/views/vehicle/vehicle/toBeStored'),
          meta: { title: '待入库车辆', icon: 'edit' }
        },
        {
          path: '/vehicle/vehicle/inventory',
          component: () => import('@/views/vehicle/vehicle/inventory'),
          meta: { title: '库存车辆', icon: 'edit' }
        },
        {
          path: '/vehicle/vehicle/abroad',
          component: () => import('@/views/vehicle/vehicle/abroad'),
          meta: { title: '已出境车辆', icon: 'edit' }
        },
        {
          path: '/vehicle/vehicle/damage',
          component: () => import('@/views/vehicle/vehicle/damage'),
          meta: { title: '有损车辆', icon: 'edit' }
        }
      ]
    },
    {
      path: '/vehicle/cost',
      name: '费用核算',
      meta: { title: '费用核算', icon: 'edit' },
      component: () => import('@/views/vehicle/cost'),
    },
    {
      path: '/vehicle/cooperate',
      name: '合作方管理',
      meta: { title: '合作方管理', icon: 'edit' },
      component: () => import('@/views/link'),
      children: [
        {
          path: '/vehicle/cooperate/custom',
          name: '客户信息管理',
          component: () => import('@/views/vehicle/cooperate/custom'),
          meta: { title: '客户信息管理', icon: 'edit' }
        },
        {
          path: '/vehicle/cooperate/domestic',
          name: '境内送车司机信息管理',
          component: () => import('@/views/vehicle/cooperate/domestic'),
          meta: { title: '境内送车司机信息管理', icon: 'edit' }
        },
        {
          path: '/vehicle/cooperate/abroad',
          name: '境外车队信息管理',
          component: () => import('@/views/vehicle/cooperate/abroad'),
          meta: { title: '境外车队信息管理', icon: 'edit' }
        },
      ]
    },
    {
      path: '/vehicle/parameter',
      name: '参数管理',
      meta: { title: '参数管理', icon: 'edit' },
      component: () => import('@/views/link'),
      children: [
        {
          path: '/vehicle/parameter/server',
          name: '服务项管理',
          component: () => import('@/views/vehicle/parameter/server'),
          meta: { title: '服务项管理', icon: 'edit' }
        },
        {
          path: '/vehicle/parameter/warehouse',
          name: '仓库管理',
          component: () => import('@/views/vehicle/parameter/warehouse'),
          meta: { title: '仓库管理', icon: 'edit' }
        },
        {
          path: '/vehicle/parameter/vehicle-brand',
          name: '车型品牌管理',
          component: () => import('@/views/vehicle/parameter/vehicle-brand'),
          meta: { title: '车型品牌管理', icon: 'edit' }
        },
        {
          path: '/vehicle/parameter/keysPosition',
          name: '钥匙位置管理',
          component: () => import('@/views/vehicle/parameter/keysPosition'),
          meta: { title: '钥匙位置管理', icon: 'edit' }
        },
        {
          path: '/vehicle/parameter/vehicle-model',
          name: '车辆型号管理',
          component: () => import('@/views/vehicle/parameter/vehicle-model'),
          meta: { title: '车辆型号管理', icon: 'edit' }
        },
      ]
    },
    {
      path: '/vehicle/count',
      meta: { title: '统计报表', icon: 'edit' },
      component: () => import('@/views/link'),
      children: [
        {
          path: '/vehicle/count/warehouse',
          component: () => import('@/views/vehicle/count/warehouse'),
          meta: { title: '仓库库存统计报表', icon: 'edit' }
        },
        {
          path: '/vehicle/count/yesterdayRevenue',
          component: () => import('@/views/vehicle/count/yesterdayRevenue'),
          meta: { title: '昨日营收统计', icon: 'edit' }
        },
        {
          path: '/vehicle/count/monthRevenue',
          component: () => import('@/views/vehicle/count/monthRevenue'),
          meta: { title: '月度营收统计', icon: 'edit' }
        },
      ]
    },
  ]
}