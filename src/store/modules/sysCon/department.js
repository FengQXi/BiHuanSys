import { reqDepartList, reqAddDepart, reqDeleteDepart } from '@/api/sysCon/department'

const getDefaultState = () => {
    return {
        departmentList: [
            {
                deptId: 1,
                createTime: '2013-02-07',
                deptName: '项目部',
                parentId:null,
                sub: null
            }, {
                deptId: 2,
                createTime: '2000-04-07',
                label: '重庆总站',
                parentId:null,
                sub: [{
                    deptId: 3,
                    createTime: '2013-02-07',
                    deptName: '重庆总站下属部门',
                    parentId:2,
                    sub:null
                }]
            }, {
                deptId: 4,
                createTime: '2003-11-09',
                deptName: '川南总站',
                parentId:null,
                sub: [{
                    deptId: 5,
                    createTime: '2013-02-07',
                    deptName: '川南总站下属',
                    parentId:4,
                    sub:null
                }, {
                    deptId: 6,
                    createTime: '2013-02-07',
                    deptName: '川南总站部门',
                    parentId:4,
                    sub:null
                }]
            }, {
                deptId: 7,
                createTime: '2019-12-07',
                deptName: '成都总站',
                parentId:null,
                sub: [{
                    deptId: 8,
                    createTime: '2013-02-07',
                    deptName: '成都总站下属部门一',
                    parentId:null,
                    sub:null
                }, {
                    deptId: 8,
                    createTime: '2013-02-07',
                    deptName: '成都总站下属部门二',
                    parentId:null,
                    sub: null
                }]
            }, {
                deptId: 10,
                createTime: '2013-02-07',
                deptName: '办公室',
                parentId:null,
                sub: null
            }, {
                deptId: 11,
                createTime: '2013-02-07',
                deptName: '财务共享中心',
                parentId:null,
                sub: null
            }, {
                deptId: 12,
                createTime: '2013-02-07',
                deptName: '物联网业务部',
                parentId:null,
                sub: null
            }, {
                deptId: 13,
                createTime: '2013-02-07',
                deptName: '党群科',
                parentId:null,
                sub: null
            },{
                deptId: 14,
                createTime: '2013-02-07',
                deptName: '财务科',
                parentId:null,
                sub: null
            },{
                deptId: 15,
                createTime: '2013-02-07',
                deptName: '财务科',
                parentId:null,
                sub: null
            },{
                deptId: 16,
                createTime: '2013-02-07',
                deptName: '川中总站',
                parentId:null,
                sub: [{ 
                        deptId: 17,
                        createTime: '2013-02-07',
                        deptName: '川中总站下属',
                        parentId:16,
                        sub: null
                    },{ 
                        deptId: 18,
                        createTime: '2013-02-07',
                        deptName: '川中总站部门',
                        parentId:16,
                        sub: null
                    }]
            },{
                deptId: 19,
                createTime: '2013-02-07',
                deptName: '环保科',
                parentId:null,
                sub: null
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