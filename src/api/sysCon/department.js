import request from '@/utils/request'

export const reqDepartList = () => {
    return request({
        url: '/system/dept/list',
        method: 'get',
    })
}

export const reqAddDepart = (data) => {
    return request({
        url: '/system/dept/add',
        method: 'post',
        data
    })
}

export const reqDeleteDepart = (deptId) => {
    return request({
        url: `/system/dept/delete/${deptId}`,
        method: 'delete'
    })
}