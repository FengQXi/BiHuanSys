import { reqProblemList, req0ProblemList, reqAddProblem, reqUpdateProblem, reqDeleteProblem, reqSbmtProblem, reqPendingSolve, reqPendingCheck, reqCompletedList, reqSolveMethod, reqRemoveStatus, reqChangeStatusReform, reqChangeStatusExamine, reqSubmitTheFile } from "@/api/problemCon/problem"
import { getToken } from '@/utils/auth'
import * as reRequest from '@/store/modules/problemCon/problem'

const getDefaultState = () => {
    return {
        allProblemList: [],
        total: 0,
        //还未提交
        problemList: [{
            quesId: '1',
            category: '安全',
            level: '一级',
            solveId: 4,
            quesDept:'',
            seriousLevel:'',
            cause: '制度贯彻，执行问题',
            createTime: '2013-02-07',
            quesDesc: '单个问题的描述',
            keyWord: '单个问题',
            problemState: '0',
            overTime: '2020-02-07',
            degree: '一般',
            department: {
                deptId: '101101',
                deptName: '重庆总站下属部门',
            },
            entryPerson: {
                userId: "32197",
                userName: "雷平",
            },
            responsePerson: {
                userId: '1000002',
                userName: '大佬'
            },
        },{
            quesId: '1',
            category: '安全',
            level: '一级',
            solveId: 4,
            quesDept:'',
            seriousLevel:'',
            cause: '制度贯彻，执行问题',
            createTime: '2013-02-07',
            quesDesc: '单个问题的描述',
            keyWord: '单个问题',
            problemState: '0',
            overTime: '2020-02-07',
            degree: '一般',
            department: {
                deptId: 102,
                deptName: '川南总站',
            },
            entryPerson: {
                userId: "32197",
                userName: "雷平",
            },
            responsePerson: {
                userId: "23200",
                userName: "廖桂英",
            },
        }],
        //正在处理
        pendingSolveList: [{
            quesId: '1',
            category: '安全',
            level: '一级',
            solveId: 4,
            quesDept:'',
            seriousLevel:'',
            cause: '制度贯彻，执行问题',
            createTime: '2013-02-07',
            quesDesc: '单个问题的描述',
            keyWord: '单个问题',
            problemState: '1',
            overTime: '2020-02-07',
            solveMethods: 'asdfasf',
            degree: '一般',
            department: {
                deptId: '100',
                deptName: '项目部',
            },
            entryPerson: {
                userId: "81199",
                userName: "朱丽",
            },
            responsePerson: {
                userId: '1000002',
                userName: '大佬'
            },
        },{
            quesId: '1',
            category: '安全',
            level: '一级',
            solveId: 4,
            quesDept:'',
            seriousLevel:'',
            cause: '制度贯彻，执行问题',
            createTime: '2013-02-07',
            quesDesc: '单个问题的描述',
            keyWord: '单个问题',
            problemState: '1',
            overTime: '2020-02-07',
            solveMethods: 'asdfasf',
            degree: '一般',
            department: {
                deptId: '100',
                deptName: '项目部',
            },
            entryPerson: {
                userId: "81199",
                userName: "朱丽",
            },
            responsePerson: {
                userId: '1000002',
                userName: '大佬'
            },
        }],
        //正在审核
        pendingCheckList: [{
            quesId: '1',
            category: '安全',
            level: '一级',
            solveId: 4,
            quesDept:'',
            seriousLevel:'',
            cause: '制度贯彻，执行问题',
            createTime: '2013-02-07',
            quesDesc: '单个问题的描述',
            keyWord: '单个问题',
            problemState: '2',
            overTime: '2020-02-07',
            solveMethods: '',
            degree: '一般',
            department: {
                deptId: '101101',
                deptName: '重庆总站下属部门',
            },
            entryPerson: {
                userId: "23200",
                userName: "廖桂英",
            },
            responsePerson: {
                userId: '1000002',
                userName: '大佬'
            },
        },{
            quesId: '1',
            category: '安全',
            level: '一级',
            solveId: 4,
            quesDept:'',
            seriousLevel:'',
            cause: '制度贯彻，执行问题',
            createTime: '2013-02-07',
            quesDesc: '单个问题的描述',
            keyWord: '单个问题',
            problemState: '2',
            overTime: '2020-02-07',
            solveMethods: '',
            degree: '一般',
            department: {
                deptId: '101101',
                deptName: '重庆总站下属部门',
            },
            entryPerson: {
                userId: "23200",
                userName: "廖桂英",
            },
            responsePerson: {
                userId: '1000002',
                userName: '大佬'
            },
        },{
            quesId: '1',
            category: '安全',
            level: '一级',
            solveId: 4,
            quesDept:'',
            seriousLevel:'',
            cause: '制度贯彻，执行问题',
            createTime: '2013-02-07',
            quesDesc: '单个问题的描述',
            keyWord: '单个问题',
            problemState: '2',
            overTime: '2020-02-07',
            solveMethods: '',
            degree: '一般',
            department: {
                deptId: '101101',
                deptName: '重庆总站下属部门',
            },
            entryPerson: {
                userId: "23200",
                userName: "廖桂英",
            },
            responsePerson: {
                userId: '1000002',
                userName: '大佬'
            },
            limitTime: '2013-02-07'
        },{
            quesId: '1',
            category: '安全',
            level: '一级',
            solveId: 4,
            quesDept:'',
            seriousLevel:'',
            cause: '制度贯彻，执行问题',
            createTime: '2013-02-07',
            quesDesc: '单个问题的描述',
            keyWord: '单个问题',
            problemState: '2',
            overTime: '2020-02-07',
            solveMethods: '',
            degree: '一般',
            department: {
                deptId: '101101',
                deptName: '重庆总站下属部门',
            },
            entryPerson: {
                userId: "23200",
                userName: "廖桂英",
            },
            responsePerson: {
                userId: '1000002',
                userName: '大佬'
            },
        }],
        // 还有一个已经闭环问题的列表 状态码为3
        completedList:[{
            quesId: '1',
            category: '安全',
            level: '一级',
            solveId: 4,
            quesDept:'',
            seriousLevel:'',
            cause: '制度贯彻，执行问题',
            createTime: '2013-02-07',
            quesDesc: '单个问题的描述',
            keyWord: '单个问题',
            problemState: '3',
            overTime: '2020-02-07',
            solveMethods: '',
            degree: '一般',
            department: {
                deptId: '101101',
                deptName: '重庆总站下属部门',
            },
            entryPerson: {
                userId: "23200",
                userName: "廖桂英",
            },
            responsePerson: {
                userId: '1000002',
                userName: '大佬'
            },
        }]
    }
}

const state = getDefaultState()

const actions = {
    async getProblemList({commit}, param) {
        let result = await reqProblemList(param)
        // console.log(result)
        if(result.code == 200) {
            commit('SET_ALLPROBLEMLIST', result.data.records)
            commit('SET_TOTAL', result.data.total)
            return 'ok'
        }
    },

    async get0ProblemList({commit}, id) {
        let result = await req0ProblemList(id)
        if(result.code == 200) {
            commit('SET_PROBLEMLIST', result.data)
            return 'ok'
        }
    },

    async addProblem({commit}, data) {
        let result = await reqAddProblem(data)
        // console.log(result, "IOP");
        if(result.code == 200) {
            commit('SET_PROBLEMLIST', result.data)
            return 'ok'
        }
    },

    async updateProblem({commit}, data) {
        let result = await reqUpdateProblem(data)
        // console.log(result)
        if(result.code == 200) {
            commit('SET_PROBLEMLIST', result.data)
            return 'ok'
        }
    },

    async deleteProblem({commit}, id) {
        let result = await reqDeleteProblem(id)
        // console.log(result)

        if(result.code == 200) {
            commit('SET_PROBLEMLIST', result.data)
            return 'ok'
        }
    },

    async submitProblem({commit}, id) {
        let result = await reqSbmtProblem(id)
        console.log(result)
        if(result.code == 200) {
            commit('SET_PROBLEMLIST', result.data)
            return 'ok'
        }
    },
    
    async getPendingSolve({commit}, id) {
        let result = await reqPendingSolve(id)
        // console.log(result)
        if(result.code == 200) {
            commit('SET_PENDINGSOLVELIST', result.data)
            return 'ok'
        }
    },

    async getPendingCheck({commit}, id) {
        let result = await reqPendingCheck(id)
        // console.log(result)
        if(result.code == 200) {
            commit('SET_PENDINGCHECK', result.data)
            return 'ok'
        }
    },

    async getCompletedList({commit}, id) {
        let result = await reqCompletedList(id)
        // console.log(result)
        if(result.code == 200) {
            commit('SET_COMPLETEDLIST', result.data)
            return 'ok'
        }
    },

    async getSolveMethod({commit}, param) {
        let result = await reqSolveMethod(param)
        // console.log(result)
        return 'ok'
        // if(result.code == 200) {
        //     commit('SET_SOLVEMETHOD', result.data)
        // }
    },

    // 待处理问题提交
    async getChangeStatusReform({commit}, quesId) {
        // console.log(quesId);
        let result = await reqChangeStatusReform(quesId)
        // console.log(result)
        if(result.code == 200) {
            commit('SET_PENDINGSOLVELIST', result.data)
            // 发请求改变待审核
            let result2 = await reqPendingCheck({
                checkId: getToken()
            })
            // console.log(result2)
            if(result2.code == 200) {
                commit('SET_PENDINGCHECK', result2.data)
                return 'ok'
            }
        }
    },

    async getChangeStatusExamine({commit}, quesId) {
        // console.log(quesId);
        let result = await reqChangeStatusExamine(quesId)
        // console.log(result)
        // return
        if(result.code == 200) {
            commit('SET_PENDINGCHECK', result.data)
            // 发请求改变已闭环
            let result2 = await reqCompletedList({
                checkId: getToken()
            })
            // console.log(result2)
            if(result2.code == 200) {
                commit('SET_COMPLETEDLIST', result2.data)
                return 'ok'
            }
        }
    },

    async getRemoveStatus({commit}, quesId) {
        let result = await reqRemoveStatus(quesId)
        // console.log(result)
        // return
        if(result.code == 200) {
            commit('SET_PENDINGCHECK', result.data)
            // 发请求改变待处理
            let result2 = await reqPendingSolve({
                checkId: getToken()
            })
            // console.log(result2)
            if(result2.code == 200) {
                commit('SET_PENDINGSOLVELIST', result2.data)
                return 'ok'
            }
        }
    },

    async getSubmitTheFile({ commit }, data){
        let result = await reqSubmitTheFile(data)
        // console.log(result)
        if(result.code == 200) {
            commit('SET_PROBLEMLIST', result.data)
            return 'ok'
        }
    }
}

const mutations = {
    SET_ALLPROBLEMLIST(state, list) {
        state.allProblemList = list
    },
    SET_TOTAL(state, total) {
        state.total = total
    },
    SET_PROBLEMLIST(state, list) {
        state.problemList = list
    },
    SET_PENDINGSOLVELIST(state, list) {
        state.pendingSolveList = list
    },
    SET_PENDINGCHECK(state, list) {
        state.pendingCheckList = list
    },
    SET_COMPLETEDLIST(state, list) {
        state.completedList = list
    },
    // SET_SOLVEMETHOD(state, list){

    // }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}