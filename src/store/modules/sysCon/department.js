import { reqDepartList } from '@/api/sysCon/department'

const state = {
    departmentList: []
}

const actions = {
    async getDepartList() {
        let result = await reqDepartList()
        if (result.code == 200) {
            commit(state, result.data.list)
        }
    }
}

const mutations = {
    SET_DEPART: (state, list) => {
        state.departmentList = list
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}