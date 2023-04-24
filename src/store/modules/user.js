import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, constantRoutes, asyncRoutes, anyRoutes } from '@/router'
import { getAsyncRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        routes: [], // 服务器返回的菜单信息
        finalRoutes: [], // 通过用户信息，计算出来的异步路由
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROUTES: (state, menuList) => {
        state.routes = menuList
    },
    SET_FINALROUTES: (state, routes) => {
        state.finalRoutes = routes
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    }
}

const actions = {
    // user login
    async login({ commit }, userInfo) {
        const userName = userInfo.username
        const password = userInfo.password
        const code = userInfo.code
        let res = await login({
            userName: userName.trim(),
            password: password,
            code: code
        })
        // console.log(result)
        if(res.code == 200) {
            // console.log(res.data.token)
            commit('SET_TOKEN', res.data.token)
            setToken(res.data.token)
            return 'ok'
        }
        else {
            return Promise.reject(new Error(res.message))
        }
        // 不用这种
        // return new Promise((resolve, reject) => {
        //   login({ username: username.trim(), password: password }).then(response => {
        //     const { data } = response
        //     commit('SET_TOKEN', data.token)
        //     setToken(data.token)
        //     resolve()
        //   }).catch(error => {
        //     reject(error)
        //   })
        // })
    },

    // get user info
    async getInfo({ commit, state }) {
        let result = await getInfo(state.token)
        // console.log(result)
        if(result.code == 200) {
            commit('SET_NAME', result.data.nickName)
            commit('SET_ROUTES', result.data.menuList)
            commit('SET_FINALROUTES', calculateRoutes(result.data.menuList))
            if(result.data.userType) commit('SET_AVATAR', result.data.userType)
            // 路由器中添加路由
            router.addRoutes(state.finalRoutes)
            // console.log(router, "@@")
            return 'ok'
        }
        else {
            return 'false'
        }
        // return new Promise((resolve, reject) => {
        //     getInfo(state.token).then(response => {
        //         const { data } = response

        //         if (!data) {
        //             return reject('Verification failed, please Login again.')
        //         }

        //         const { name, avatar } = data

        //         commit('SET_NAME', name)
        //         commit('SET_AVATAR', avatar)
        //         resolve(data)
        //     }).catch(error => {
        //         reject(error)
        //     })
        // })
    },

    // user logout
    logout({ commit, state }) {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        // return new Promise((resolve, reject) => {
        //     logout(state.token).then(() => {
        //         removeToken() // must remove  token  first
        //         resetRouter()
        //         commit('RESET_STATE')
        //         resolve()
        //     }).catch(error => {
        //         reject(error)
        //     })
        // })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

// 计算用户路由
const calculateRoutes = (routes) => {
    // const tempAsyncRoutes = JSON.parse(JSON.stringify(asyncRoutes))
    const tempAsyncRoutes = getAsyncRoutes()

    // console.log(asyncRoutes)
    // console.log(tempAsyncRoutes)
    // console.log(routes)

    const finalAsyncRoutes = tempAsyncRoutes.filter(item => {
        // console.log(item)
        item.children = item.children.filter(child => {
            // console.log(child, routes.indexOf(child.name))
            return routes.indexOf(child.name) != -1
        })

        // console.log(item.children.length)
        if(item.children && item.children.length) {
            return true
        }
    })
    return constantRoutes.concat(finalAsyncRoutes, anyRoutes)
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

