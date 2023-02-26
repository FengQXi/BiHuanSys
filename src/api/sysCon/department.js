import request from '@/utils/request'

// 获取所有部门的列表
export const reqDepartList = () => {
    return request({
        url: '/system/dept/list',
        method: 'get',
    })
}

// 新增部门的接口
// 数据为部门信息
export const reqAddDepart = (data) => {
    return request({
        url: '/system/dept/add',
        method: 'post',
        data
    })
}

// 删除部门的接口
// 数据为部门id
export const reqDeleteDepart = (deptId) => {
    return request({
        url: `/system/dept/delete/${deptId}`,
        method: 'delete'
    })
}