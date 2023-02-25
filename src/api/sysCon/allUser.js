import request from '@/utils/request'

export const reqAllUserList = (param) => {
    return request({
        url: '/system/user/getUser',
        method: 'post',
        data: param,
    })
}