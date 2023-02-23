import { reqDepartList, reqAddDepart, reqDeleteDepart } from '@/api/sysCon/department'

const getDefaultState = () => {
    return {
        departmentList: [
            {
                id: 100,
                date: '2013-02-07',
                label: '项目部',
                children: []
            }, {
                id: 101,
                date: '2000-04-07',
                label: '重庆总站',
                children: [{
                    id: 101101,
                    date: '2013-02-07',
                    label: '重庆总站下属部门',
                }]
            }, {
                id: 102,
                date: '2003-11-09',
                label: '川南总站',
                children: [{
                    id: 102102,
                    date: '2013-02-07',
                    label: '川南总站下属部门一'
                }, {
                    id: 6,
                    date: '2013-02-07',
                    label: '川南总站下属部门二'
                }]
            }, {
                id: 104,
                date: '2019-12-07',
                label: '成都总站',
                children: [{
                    id: 7,
                    date: '2013-02-07',
                    label: '成都总站下属部门一'
                }, {
                    id: 8,
                    date: '2013-02-07',
                    label: '成都总站下属部门二'
                }]
            }, {
                id: 105,
                date: '2013-02-07',
                label: '办公室',
                children: []
            }, {
                id: 106,
                date: '2013-02-07',
                label: '财务共享中心',
                children: []
            }, {
                id: 107,
                date: '2013-02-07',
                label: '物联网业务部',
                children: []
            }, {
                id: 108,
                date: '2013-02-07',
                label: '党群科',
                children: []
            }]
    }
}

const state = getDefaultState()

const actions = {
    async getDepartList({ commit }) {
        let result = await reqDepartList()
        // console.log(result)
        if (result.code == 200) {
            commit('SET_DEPART', result.data)
        }
    },
    async addDepart({ commit }, depart) {
        console.log(depart)
        let result = await reqAddDepart(depart)
        // console.log(result)
        // if(result.code == 200) {
        //     // 添加成功之后，修改列表
        //     commit()
        // }
    },
    async deleteDepart({ commit }, deptId) {
        let result = await reqDeleteDepart(deptId)
        console.log(result)
        // if(result.code == 200) {
        //     commit()
        // }
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