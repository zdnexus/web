/**
 * Created by zhongdong on 2023/8/26
 * Url :
 */

import Layout from '@/layout'

export default {
  path: '/organization',
  component: Layout,
  meta: { title: '组织管理', icon: 'list' },
  children: [
    {
      path: '/organization/user',
      component: () => import('@/views/organization/user'),
      meta: { title: '用户管理', icon: 'edit' }
    },
    {
      path: '/organization/department',
      component: () => import('@/views/organization/department'),
      meta: { title: '部门管理', icon: 'edit' }
    },
    {
      path: '/organization/role',
      component: () => import('@/views/organization/role'),
      meta: { title: '角色管理', icon: 'edit' }
    },
    {
      path: '/organization/post',
      component: () => import('@/views/organization/post'),
      meta: { title: '岗位管理', icon: 'edit' }
    },
    {
      path: '/organization/structure',
      component: () => import('@/views/organization/structure'),
      meta: { title: '组织架构图', icon: 'edit' }
    }
  ]
}
