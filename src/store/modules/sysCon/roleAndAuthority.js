import { reqRoleList, reqAddRole, reqDeleteRole } from '@/api/sysCon/role'

const getDefaultState = () => {
    return {
        roleList: [{
            id: 1,
            roleName: '超级用户',
            authorityList: [{
                authorityId: '11',
                authorityName: '用户管理',
            },
            {
                authorityId: '12',
                authorityName: '角色管理管理',
            }]
        },
        {
            id: 2,
            roleName: '超级管理员',
            authorityList: [{
                authorityId: '11',
                authorityName: '用户管理',
            },
            {
                authorityId: '12',
                authorityName: '角色管理管理',
            },
            {
                authorityId: '13',
                authorityName: '部门管理',
            }]
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
        // console.log(result)
        if (result.code == 200) {
            commit('SET_ROLELIST', result.data)
        }
    },

    async addRole({commit}, role) {
        let result = await reqAddRole(role)
        console.log(result);
        // if(result.code == 200) {

        // }
    },

    async deleteRole({commit}, roleId) {
        let result = await reqDeleteRole(roleId)
        console.log(result)
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