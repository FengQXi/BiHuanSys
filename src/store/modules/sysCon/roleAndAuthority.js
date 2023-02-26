import { reqRoleList, reqAddRole, reqDeleteRole, reqUpdateRole } from '@/api/sysCon/role'

const getDefaultState = () => {
    return {
        roleList: [{
            roleId: 1,
            roleName: '超级管理员',
            list: [{
                menuId: 1,
                menuName: 'Dashboard',
                name: "首页",
                sub: null,
            },
            {
                menuId: 2,
                menuName: "SearchManagement",
                name: "问题查询",
                sub: null,
            },
            {
                menuId: 3,
                menuName: "ProblemEntry",
                name: "问题录入",
                sub: null,
            }]
        },
        {
            roleId: 2,
            roleName: '普通管理员',
            list: [{
                menuId: 1,
                menuName: "Dashboard",
                name: "首页",
                sub: null,
            },
            {
                menuId: 4,
                menuName: "ProblemSolve",
                name: "问题处理",
                sub: null,

            },]
        }],
        allAuthorityList: [
            {
                menuId: '2',
                menuName: 'SearchManagement',
                name: '问题查询'
            },
            {
                menuId: '3',
                menuName: 'ProblemEntry',
                name: '问题录入'
            },
            {
                menuId: '4',
                menuName: 'ProblemSolve',
                name: '问题处理'
            },
            {
                menuId: '5',
                menuName: 'TemplateManage',
                name: '模板管理'
            },
            {
                menuId: '7',
                menuName: 'UserManagement',
                name: '用户管理'
            },
            {
                menuId: '8',
                menuName: 'RoleManagement',
                name: '角色管理'
            },
            {
                menuId: '9',
                menuName: 'DepartmentManagement',
                name: '部门管理'
            },
        ],
    }
}

const state = getDefaultState()

const actions = {
    async getRoleList({ commit }) {
        let result = await reqRoleList()
        console.log(result.data)
        if (result.code == 200) {
            commit('SET_ROLELIST', result.data)
            return
        }
    },

    async addRole({ commit }, role) {
        let result = await reqAddRole(role)
        // console.log(result);
        // return
        if(result.code == 200) {
            commit('SET_ROLELIST', result.data)
            return 'ok'
        }
    },

    async updateRole({commit}, role)  {
        let result = await reqUpdateRole(role)
        console.log(result)
        if(result.code == 200) {
            commit('SET_ROLELIST', result.data)
            return 'ok'
        }
    },

    async deleteRole({ commit }, roleId) {
        let result = await reqDeleteRole(roleId)
        console.log(result)
        if(result.code == 200) {
            commit('SET_ROLELIST', result.data)
            return 'ok'
        }
    }
}

const mutations = {
    SET_ROLELIST: (state, list) => {
        // console.log(list)
        state.roleList = list
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}