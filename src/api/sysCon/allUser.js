import request from '@/utils/request'

export const reqAllUserList = () => {
    return request({
        url: '/system/user/list',
        method: 'get',
    })
}