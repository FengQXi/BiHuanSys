import { reqXXX } from "@/api/problemCon/problem"

const getDefaultState = () => {
    return {
        //还未提交
        problemList: [{
            id: '2000001',
            entryTime: '2013-02-07',
            name: '单个问题',
            describe: '单个问题的描述',
            category: '安全',
            cause: '制度贯彻，执行问题',
            level: '一级',
            degree: '一般',
            status: '0',
            department: {
                id: '101101',
                label: '重庆总站下属部门',
            },
            entryPerson: {
                id: "32197",
                name: "雷平",
            },
            responsePerson: {
                id: '1000002',
                name: '大佬'
            },
            limitTime: '2020-02-07'
        },
        {
            id: '2000002',
            entryTime: '2018-12-27',
            name: '是个问题',
            describe: '简单描述描述',
            category: '安全',
            cause: '能力欠缺问题',
            level: '二级',
            degree: '严重',
            status: '0',
            department: {
                id: 102,
                label: '川南总站',
            },
            entryPerson: {
                id: "32197",
                name: "雷平",
            },
            responsePerson: {
                id: "23200",
                name: "廖桂英",
            },
            limitTime: '2023-02-17'
        }],
        //正在处理
        pendingSolveList: [{
            id: '2000001',
            entryTime: '2013-02-07',
            name: '单个问题',
            describe: '单个问题的描述',
            category: '安全',
            cause: '制度贯彻，执行问题',
            level: '一级',
            degree: '一般',
            status: '1',
            department: {
                id: '100',
                label: '项目部',
            },
            entryPerson: {
                id: "81199",
                name: "朱丽",
            },
            responsePerson: {
                id: '1000002',
                name: '大佬'
            },
            solveMethods: 'asdfasf',
            limitTime: '2020-02-07'
        },
        {
            id: '2000002',
            entryTime: '2013-02-07',
            name: '单个问题',
            describe: '单个问题的描述',
            category: '安全',
            cause: '制度贯彻，执行问题',
            level: '一级',
            degree: '一般',
            status: '1',
            department: {
                id: '100',
                label: '项目部',
            },
            entryPerson: {
                id: "81199",
                name: "朱丽",
            },
            responsePerson: {
                id: '1000002',
                name: '大佬'
            },
            solveMethods: '',
            limitTime: '2013-02-05'
        }],
        //正在审核
        pendingCheckList: [{
            id: '2000001',
            entryTime: '2013-02-07',
            name: '单个问题',
            describe: '单个问题的描述',
            category: '安全',
            cause: '制度贯彻，执行问题',
            level: '一级',
            degree: '一般',
            status: '2',
            department: {
                id: '101101',
                label: '重庆总站下属部门',
            },
            entryPerson: {
                id: "23200",
                name: "廖桂英",
            },
            responsePerson: {
                id: '1000002',
                name: '大佬'
            },
            limitTime: '2020-02-07'
        },
        {
            id: '2000001',
            entryTime: '2013-02-07',
            name: '单个问题',
            describe: '单个问题的描述',
            category: '安全',
            cause: '制度贯彻，执行问题',
            level: '一级',
            degree: '一般',
            status: '2',
            department: {
                id: '101101',
                label: '重庆总站下属部门',
            },
            entryPerson: {
                id: "23200",
                name: "廖桂英",
            },
            responsePerson: {
                id: '1000002',
                name: '大佬'
            },
            limitTime: '2013-02-07'
        },
        {
            id: '2000001',
            entryTime: '2013-02-07',
            name: '单个问题',
            describe: '单个问题的描述',
            category: '安全',
            cause: '制度贯彻，执行问题',
            level: '一级',
            degree: '一般',
            status: '2',
            department: {
                id: '101101',
                label: '重庆总站下属部门',
            },
            entryPerson: {
                id: "23200",
                name: "廖桂英",
            },
            responsePerson: {
                id: '1000002',
                name: '大佬'
            },
            limitTime: '2013-02-07'
        },
        {
            id: '2000001',
            entryTime: '2013-02-07',
            name: '单个问题',
            describe: '单个问题的描述',
            category: '安全',
            cause: '制度贯彻，执行问题',
            level: '一级',
            degree: '一般',
            status: '2',
            department: {
                id: '101101',
                label: '重庆总站下属部门',
            },
            entryPerson: {
                id: "23200",
                name: "廖桂英",
            },
            responsePerson: {
                id: '1000002',
                name: '大佬'
            },
            limitTime: '2013-02-07'
        }],
        // 还有一个已经闭环问题的列表 状态码为3
        completedList:[{
            id: '2000001',
            entryTime: '2013-02-07',
            name: '单个问题',
            describe: '单个问题的描述',
            category: '安全',
            cause: '制度贯彻，执行问题',
            level: '一级',
            degree: '一般',
            status: '3',
            department: {
                id: '101101',
                label: '重庆总站下属部门',
            },
            entryPerson: {
                id: "23200",
                name: "廖桂英",
            },
            responsePerson: {
                id: '1000002',
                name: '大佬'
            },
            limitTime: '2020-02-07'
        }]
    }
}

const state = getDefaultState()

const actions = {
    
}

const mutations = {
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}