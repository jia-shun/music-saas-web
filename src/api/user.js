import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/base/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/base/register',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
