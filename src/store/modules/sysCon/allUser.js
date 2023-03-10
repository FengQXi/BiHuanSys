import { reqAddUser, reqAllUserList, reqUpdateUser, reqDeleteUser } from "@/api/sysCon/allUser";

const getDefaultState = () => {
    return {
        // allUserList: [{
        //     id: "81199",
        //     name: "朱丽",
        //     sector: '项目部',
        //     phone: "63154864",
        //     status: 1,
        //     date: "1999-11-17",
        //     role:'role1',
        // },{
        //     id: "23200",
        //     name: "廖桂英",
        //     sector: '川南总站',
        //     phone: "81739984",
        //     status: 1,
        //     date: "1974-09-06",
        //     role:'role1',
        // },{
        //     id: "52198",
        //     name: "罗秀兰",
        //     sector: '川南总站下属一',
        //     phone: "52033586",
        //     status: 0,
        //     date: "2022-10-20",
        //     role:'role1',
        // },{
        //     id: "32197",
        //     name: "雷平",
        //     sector: '成都总站',
        //     phone: "18824722",
        //     status: 1,
        //     date: "1980-07-13",
        //     role:'role1',
        // },{
        //     id: "33201",
        //     name: "顾秀兰",
        //     sector: '重庆总站',
        //     phone: "77441860",
        //     status: 0,
        //     date: "1994-04-07",
        //     role:'role1',
        // },{
        //     id: "71197",
        //     name: "高超",
        //     sector: '重庆总站',
        //     phone: "54088254",
        //     status: 1,
        //     date: "1985-10-30",
        //     role:'role1',
        // },{
        //     id: "32202",
        //     name: "郑平",
        //     sector: '重庆总站下属部门一',
        //     phone: "81542850",
        //     status: 0,
        //     date: "1978-06-18",
        //     role:'role1',
        // },{
        //     id: "31351",
        //     name: "常霞",
        //     sector: '重庆总站下属部门二',
        //     phone: "38875962",
        //     status: 1,
        //     date: "2012-03-04",
        //     role:'role1',
        // },{
        //     id: "65199",
        //     name: "杨强",
        //     sector: '项目部',
        //     phone: "06603975",
        //     status: 0,
        //     date: "2020-09-09",
        //     role:'role1',
        // },{
        //     id: "63197",
        //     name: "罗明",
        //     sector: '项目部',
        //     phone: "37104738",
        //     status: 0,
        //     date: "1973-01-24",
        //     role:'role1',
        // },{
        //     id: "12197",
        //     name: "吕强",
        //     sector: '川西总站',
        //     phone: "33851660",
        //     status: 0,
        //     date: "2001-07-27",
        //     role:'role1',
        // },{
        //     id: "642014",
        //     name: "刘丽",
        //     sector: '川西总站',
        //     phone: "14966146",
        //     status: 0,
        //     date: "2000-10-28",
        //     role:'role1',
        // }]
        allUserList: [{
            createBy: null,
            createTime: null,
            delFlag: "0",
            deptId: 1,
            deptName: "项目部",
            email: null,
            nickName: "朱丽",
            password: "123456",
            phonenumber: "15348229603",
            roleId: 1,
            roleName: "超级管理员",
            sex: null,
            status: "1",
            updateBy: null,
            updateTime: null,
            userId: 1,
            userName: "admin",
            userType: null,
        }, {
            createBy: null,
            createTime: null,
            delFlag: "0",
            deptId: 1,
            deptName: "项目部",
            email: null,
            nickName: "朱丽",
            password: "123456",
            phonenumber: "15348229603",
            roleId: 1,
            roleName: "超级管理员",
            sex: null,
            status: "1",
            updateBy: null,
            updateTime: null,
            userId: 1,
            userName: "admin",
            userType: null,
        }, {
            createBy: null,
            createTime: null,
            delFlag: "0",
            deptId: 1,
            deptName: "项目部",
            email: null,
            nickName: "朱丽",
            password: "123456",
            phonenumber: "15348229603",
            roleId: 1,
            roleName: "超级管理员",
            sex: null,
            status: "1",
            updateBy: null,
            updateTime: null,
            userId: 1,
            userName: "admin",
            userType: null,
        }, {
            createBy: null,
            createTime: null,
            delFlag: "0",
            deptId: 1,
            deptName: "项目部",
            email: null,
            nickName: "朱丽",
            password: "123456",
            phonenumber: "15348229603",
            roleId: 1,
            roleName: "超级管理员",
            sex: null,
            status: "1",
            updateBy: null,
            updateTime: null,
            userId: 1,
            userName: "admin",
            userType: null,
        }, {
            createBy: null,
            createTime: null,
            delFlag: "0",
            deptId: 1,
            deptName: "项目部",
            email: null,
            nickName: "朱丽",
            password: "123456",
            phonenumber: "15348229603",
            roleId: 1,
            roleName: "超级管理员",
            sex: null,
            status: "1",
            updateBy: null,
            updateTime: null,
            userId: 1,
            userName: "admin",
            userType: null,
        }, {
            createBy: null,
            createTime: null,
            delFlag: "0",
            deptId: 1,
            deptName: "项目部",
            email: null,
            nickName: "朱丽",
            password: "123456",
            phonenumber: "15348229603",
            roleId: 1,
            roleName: "超级管理员",
            sex: null,
            status: "1",
            updateBy: null,
            updateTime: null,
            userId: 1,
            userName: "admin",
            userType: null,
        }, {
            createBy: null,
            createTime: null,
            delFlag: "0",
            deptId: 1,
            deptName: "项目部",
            email: null,
            nickName: "朱丽",
            password: "123456",
            phonenumber: "15348229603",
            roleId: 1,
            roleName: "超级管理员",
            sex: null,
            status: "1",
            updateBy: null,
            updateTime: null,
            userId: 1,
            userName: "admin",
            userType: null,
        }, {
            createBy: null,
            createTime: null,
            delFlag: "0",
            deptId: 1,
            deptName: "项目部",
            email: null,
            nickName: "朱丽",
            password: "123456",
            phonenumber: "15348229603",
            roleId: 1,
            roleName: "超级管理员",
            sex: null,
            status: "1",
            updateBy: null,
            updateTime: null,
            userId: 1,
            userName: "admin",
            userType: null,
        }, {
            createBy: null,
            createTime: null,
            delFlag: "0",
            deptId: 1,
            deptName: "项目部",
            email: null,
            nickName: "朱丽",
            password: "123456",
            phonenumber: "15348229603",
            roleId: 1,
            roleName: "超级管理员",
            sex: null,
            status: "1",
            updateBy: null,
            updateTime: null,
            userId: 1,
            userName: "admin",
            userType: null,
        }, {
            createBy: null,
            createTime: null,
            delFlag: "0",
            deptId: 1,
            deptName: "项目部",
            email: null,
            nickName: "朱丽",
            password: "123456",
            phonenumber: "15348229603",
            roleId: 1,
            roleName: "超级管理员",
            sex: null,
            status: "1",
            updateBy: null,
            updateTime: null,
            userId: 1,
            userName: "admin",
            userType: null,
        }, {
            createBy: null,
            createTime: null,
            delFlag: "0",
            deptId: 1,
            deptName: "项目部",
            email: null,
            nickName: "朱丽",
            password: "123456",
            phonenumber: "15348229603",
            roleId: 1,
            roleName: "超级管理员",
            sex: null,
            status: "1",
            updateBy: null,
            updateTime: null,
            userId: 1,
            userName: "admin",
            userType: null,
        }, {
            createBy: null,
            createTime: null,
            delFlag: "0",
            deptId: 1,
            deptName: "项目部",
            email: null,
            nickName: "朱丽",
            password: "123456",
            phonenumber: "15348229603",
            roleId: 1,
            roleName: "超级管理员",
            sex: null,
            status: "1",
            updateBy: null,
            updateTime: null,
            userId: 1,
            userName: "admin",
            userType: null,
        }],
        totalCount: 12,
    }
}

const state = getDefaultState()

const actions = {
    async getAllUserList({ commit }, param) {
        // console.log(param, "(((")
        let result = await reqAllUserList(param)
        console.log(result);
        if (result.code == 200) {
            commit('SET_USERLIST', result.data.records)
            commit('SET_TOTAL', result.data.total)
            return
        }
    },

    async addUser({commit}, param) {
        let result = await reqAddUser(param)
        // console.log(result)
        if(result.code == 200) {
            return 'ok'
        }
    },

    async updateUser({commit}, param) {
        let result = await reqUpdateUser(param)
        // console.log(result)
        if(result.code == 200) {
            return 'ok'
        }
    },

    async deleteUser({commit}, userId) {
        let result = await reqDeleteUser(userId)
        // console.log(result)
        if(result.code == 200) {
            return 'ok'
        }
    }
}

const mutations = {
    SET_USERLIST: (state, list) => {
        state.allUserList = list
    },
    SET_TOTAL: (state, total) => {
        state.totalCount = total
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}