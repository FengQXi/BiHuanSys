import { reqRoleList } from '@/api/sysCon/role'

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
        allAuthorityList: [{
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
        },
        {
            authorityId: '14',
            authorityName: '图表管理',
        }
        ],
    }
}

const state = getDefaultState()

const actions = {
    async getRoleList() {
        let result = await reqRoleList()
        if (result.code == 200) {
            commit(state, result.data.list)
        }
    }
}

const mutations = {
    SET_ROLELIST: (state, list) => {
        state.roleList = list
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}