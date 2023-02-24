import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, constantRoutes, asyncRoutes, anyRoutes } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: 'Super Admin',
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
    SET_FINALROUTES: (state, routes) => {
        state.finalRoutes = routes
    },
}

const actions = {
    // user login
    async login({ commit }, userInfo) {
        const userName = userInfo.username
        const password = userInfo.password
        let result = await login({userName: userName.trim(), password: password})
        console.log(result)
        if(result.code == 200) {
            console.log(result.data.token)
            commit('SET_TOKEN', result.data.token)
            setToken(result.data.token)
            return 'ok'
        }
        else {
            return Promise.reject(new Error(result.message))
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
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    return reject('Verification failed, please Login again.')
                }

                const { name, avatar } = data

                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
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
    const finalAsyncRoutes = asyncRoutes.filter(item => {
        console.log(item)
        item.children.filter(child => {
            return routes.some(item1 => {
                console.log(child)
                console.log(item1)
            })
        })

        if(item.children.length) {
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

