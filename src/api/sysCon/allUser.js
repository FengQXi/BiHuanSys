import request from '@/utils/request'

export const reqAllUserList = (param) => {
    return request({
        url: '/system/user/getUser',
        method: 'post',
        data: param,
    })
}

export const reqAddUser = (param) => {
    return request({
        url: '/system/user/add',
        method: 'post',
        data: param,
    })
}

export const reqUpdateUser = (param) => {
    return request({
        url: '/system/user/update',
        method: 'put',
        data: param,
    })
}

export const reqDeleteUser = (userId) => {
    return request({
        url: `/system/user/delete/${userId}`,
        method: 'delete',
    })
}

