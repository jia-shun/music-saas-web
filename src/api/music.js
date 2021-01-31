import request from '@/utils/request'

export function get(data) {
  return request({
    url: 'music/list',
    method: 'post',
    data
  })
}

export function getById(id) {
  return request({
    url: 'music/id',
    method: 'post',
    data: id
  })
}

export function add(data) {
  return request({
    url: 'music/create',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'music/delete',
    method: 'post',
    data: id
  })
}

export function edit(data) {
  return request({
    url: 'music/update',
    method: 'post',
    data
  })
}

export default { get, getById, add, edit, del }
