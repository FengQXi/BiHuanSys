import request from '@/utils/request'

export const reqAllUserList = () => {
    console.log("*");
    return request({
        url: '/system/user/list',
        method: 'get',
    })
}