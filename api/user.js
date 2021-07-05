import { request } from "@/utils/request.js"

export const login = data => request({
  method: 'POST',
  url: '/api/users/login',
  data
})

export const register = data => request({
  method: 'POST',
  url: '/api/users',
  data
})

// 修改用户资料
export const updateUser = data => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}