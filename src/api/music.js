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
    url: 'music/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'music',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'music/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'music',
    method: 'put',
    data
  })
}

export function editStatus(data) {
  return request({
    url: 'music/status',
    method: 'put',
    data
  })
}

export default { get, getById, add, edit, del, editStatus }
