import request from "../utils/request"

//封装一个登录的请求函数,登录接口
export function login(data){
    return request({
        url:"/user/login",
        method:"post",
        data
    })
}

//根据token获取用户权限
export function getInfo(){
    return request({
        url:"/user/getInfo",
        method:"get"
    })
}

export function getUserList(data) {
    return request({
      url: '/user/getUserList',
      method: 'get',
      data
    })
  }
  //修改用户权限
  export function changeRole(data) {
    return request({
      url: '/user/changeRole',
      method: 'post',
      data
    })
  }