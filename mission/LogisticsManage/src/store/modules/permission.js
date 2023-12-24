import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(roles) {
  const n = roles.find(item => item.meta.title === '控制台') ? 6 : 5
  const res = constantRoutes.splice(0, n)
  
  roles.forEach(role => {
    constantRoutes.forEach(route => {
      if (role.meta.title === route.meta?.title) {
        const o = {
          ...route,
          children: []
        }
        role.children && role.children.forEach(role1 => {
          route.children.forEach(route1 => {
            if (role1.meta.title === route1.meta.title) {
              const o1 = {
                ...route1,
                children: []
              }
              role1.children && role1.children.forEach(role2 => {
                route1?.children.forEach(route2 => {
                  if (role2.meta.title === route2.meta.title) {
                    o1.children.push({
                      ...route2
                    })
                  }
                })
              })
              o.children.push(o1)
            }
          })
        })
        res.push(o)
      }
    })
  })
  
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = routes
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = filterAsyncRoutes(roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
