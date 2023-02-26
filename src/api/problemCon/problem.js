import request from '@/utils/request'

// 请求所有未提交问题的接口
// 数据未当前登录用户id
export const reqProblemList = (param) => {
    return request({
        url: '/system/problem/listBy',
        method: 'post',
        data: param,
    })
}


// 请求待处理问题接口
// 数据为当前登录用户id
export const req0ProblemList = (id) => {
    // console.log(id)
    return request({
        url: '/system/problem/list0',
        method: 'get',
        params: id,
    })
}

// 单个录入问题的接口
// 数据为问题信息
export const reqAddProblem = (data) => {
    return request({
        url: '/system/problem/add',
        method: 'post',
        data,
    })
}

// 修改问题的接口
// 数据为问题信息
export const reqUpdateProblem = (data) => {
    return request({
        url: '/system/problem/update',
        method: 'put',
        data: data,
    })
}

// 删除问题的接口
// 数据为问题id
export const reqDeleteProblem = (id) => {
    return request({
        url: `/system/problem/delete/${id}`,
        method: 'delete',
    })
}

// 提交问题的接口
// 数据为问题id
export const reqSbmtProblem = (id) => {
    return request({
        url: `/system/problem/commit/${id}`,
        method: 'put',
    })
}

// 请求待处理问题的接口
// 数据为登录人id
export const reqPendingSolve = (id) => {
    return request({
        url: '/system/problem/list1',
        method: 'get',
        params: id,
    })
}


// 请求待审核问题接口
// 数据为登录人id
export const reqPendingCheck = (id) => {
    return request({
        url: '/system/problem/list2',
        method: 'get',
        params: id,
    })
}

// 请求已闭环问题接口
// 数据为登录人id
export const reqCompletedList = (id) => {
    return request({
        url: '/system/problem/list3',
        method: 'get',
        params: id,
    })
}

// 添加解决办法的接口
// 数据为解决方法
export const reqSolveMethod = (param) => {
    console.log(param)
    return request({
        url: '/system/problem/addMethod',
        method: 'put',
        params: param,
    })
}

// 审核不通过的接口
// 数据为问题id
export const reqChangeStatusReform = (param) => {
    return request({
        url: `/system/problem/reform/${param}`,
        method: 'put',
        params: {
            quesId: param
        },
    })
}

// 审核通过的接口
// 数据为问题id
export const reqChangeStatusExamine= (param) => {
    return request({
        url: `/system/problem/examine/${param}`,
        method: 'put',
        params: {
            quesId: param
        },
    })
}

export const reqRemoveStatus = (param) => {
    return request({
        url: `/system/problem/reformAgain/${param}`,
        method: 'put',
        params: param,
    })
}

export const reqSubmitTheFile = (data) => {
    return request({
        url:'/system/problem/addFile',
        method:'post',
        data: data
    })
}