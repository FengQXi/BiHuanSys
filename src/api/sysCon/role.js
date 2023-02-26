import request from '@/utils/request'

// 请求所有角色的接口
export const reqRoleList = () => {
    return request({
        url: '/system/role/list',
        method: 'get',
    })
}

// 添加角色的接口
// 数据为角色信息和对应权限
export const reqAddRole = (role) => {
    return request({
        url: '/system/role/add',
        method: 'post',
        data: role,
    })
}

// 修改角色的接口
// 数据为对应权限
export const reqUpdateRole = (role) => {
    return request({
        url: '/system/role/update',
        method: 'put',
        data: role,
    })
}

// 删除角色的接口
// 数据为角色id
export const reqDeleteRole = (roleId) => {
    return request({
        url: `/system/role/delete/${roleId}`,
        method: 'delete',
    })
}