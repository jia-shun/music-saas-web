import request from '@/utils/request'

export function get() {
  const params = {
    page: 0,
    pageSize: 20
  }
  return request({
    url: 'music',
    method: 'get',
    params
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
    url: 'music',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'music',
    method: 'delete',
    data: id
  })
}

export function edit(data) {
  return request({
    url: 'music',
    method: 'put',
    data
  })
}

export default { getById, add, edit, del }
