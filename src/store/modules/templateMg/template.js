const getDefaultState = () => {
    return {
        categoryList: [
            {
                id: '110',
                name: '安全',
                flag: true,
            },
            {
                id: '111',
                name: '生产',
                flag: true,
            },
            {
                id: '112',
                name: '财务',
                flag: true,
            },
            {
                id: '113',
                name: '巡查',
                flag: false,
            },
            {
                id: '114',
                name: '审计',
                flag: true,
            },
            {
                id: '115',
                name: '施工',
                flag: true,
            },
            {
                id: '116',
                name: '其他',
                flag: false,
            }
        ],
        causeList: [
            {
                id: '1010',
                name: '制度贯彻，执行问题',
                flag: true,
            },
            {
                id: '1011',
                name: '思想认知问题',
                flag: true,
            },
            {
                id: '1012',
                name: '管理存在漏洞',
                flag: true,
            },
            {
                id: '1013',
                name: '能力欠缺问题',
                flag: false,
            },
            {
                id: '1014',
                name: '履职问题',
                flag: true,
            },
            {
                id: '1015',
                name: '业务流程问题',
                flag: true,
            },
            {
                id: '1016',
                name: '其他',
                flag: true,
            }
        ],
        levelList: [
            {
                id: '10010',
                name: '一级',
                flag: true,
            },
            {
                id: '10011',
                name: '二级',
                flag: true,
            }
        ],
        degreeList: [
            {
                id: '100001',
                name: '一般',
                flag: true,
            },
            {
                id: '100002',
                name: '普通',
                flag: true,
            },
            {
                id: '100003',
                name: '严重',
                flag: true,
            }
        ],
        // 需要从部门的仓库里面动态获取然后维护出相应格式
        allDepartmentList: []
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