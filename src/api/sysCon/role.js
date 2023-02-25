import request from '@/utils/request'

export const reqRoleList = () => {
    return request({
        url: '/system/role/list',
        method: 'get',
    })
}


export const reqAddRole = (role) => {
    return request({
        url: '/system/role/add',
        method: 'post',
        data: role,
    })
}

export const reqUpdateRole = (role) => {
    return request({
        url: '/system/role/update',
        method: 'put',
        data: role,
    })
}

export const reqDeleteRole = (roleId) => {
    return request({
        url: `/system/role/delete/${roleId}`,
        method: 'delete',
    })
}

//修改