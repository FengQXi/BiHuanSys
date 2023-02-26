import request from '@/utils/request'

// 获取所有用户的接口
// 数据为分页信息
export const reqAllUserList = (param) => {
    return request({
        url: '/system/user/getUser',
        method: 'post',
        data: param,
    })
}

// 添加用户的接口
// 数据为用户信息
export const reqAddUser = (param) => {
    return request({
        url: '/system/user/add',
        method: 'post',
        data: param,
    })
}

// 修改用户的接口
// 数据为用户信息
export const reqUpdateUser = (param) => {
    return request({
        url: '/system/user/update',
        method: 'put',
        data: param,
    })
}

// 删除用户的接口
// 数据为用户id
export const reqDeleteUser = (userId) => {
    return request({
        url: `/system/user/delete/${userId}`,
        method: 'delete',
    })
}

// 在录入问题的时候，通过部门查询用户   （二级联动）
export const reqUserByDept = (deptId) => {
    return request({
        url: `/system/problem/findUser`,
        method: 'get',
        params: {
            deptId
        }
    })
}

