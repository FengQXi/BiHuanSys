import request from '@/utils/request'

// 获取验证码
export function reqCode(userName) {
    return request({
        url: '/system/verificationCode',
        method: 'get',
        params: { userName }
    })
}

// 用户登录的接口
// 数据为账户和密码
export function login(data) {
  return request({
    url: '/system/login',
    method: 'post',
    data
  })
}

// 获取用户的信息
export function getInfo(token) {
  return request({
    url: '/system/getUserInfo',
    method: 'get',
    params: { userId: token }
  })
}

// 登出
export function logout(data) {
  return request({
    url: '/system/logout',
    method: 'post',
    data,
  })
}
