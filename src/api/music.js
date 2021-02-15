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

export function editFinishStatus(data) {
  return request({
    url: 'music/finish-status',
    method: 'put',
    data
  })
}

export function editPayStatus(data) {
  return request({
    url: 'music/pay-status',
    method: 'put',
    data
  })
}

export default { get, getById, add, edit, del, editFinishStatus, editPayStatus }
