/**
 * Created by zhongdong on 2023/8/26
 * Url :
 */

import Layout from '@/layout'

export default {
  path: '/organization',
  component: Layout,
  meta: {
    title: '组织管理',
    icon: 'list',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [
    {
      path: '/organization/station',
      component: () => import('@/views/organization/station'),
      meta: { title: '岗位管理', icon: 'edit' }
    },
    {
      path: '/organization/department',
      component: () => import('@/views/organization/department'),
      meta: { title: '部门管理', icon: 'edit' }
    },
    {
      path: '/organization/structure',
      component: () => import('@/views/organization/structure'),
      meta: { title: '组织架构图', icon: 'edit' }
    },
    {
      path: '/organization/user',
      component: () => import('@/views/organization/user'),
      meta: { title: '用户管理', icon: 'edit' }
    },
  ]
}
