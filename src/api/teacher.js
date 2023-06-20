import request from "../utils/request"

export function getTeacherList(data){
    return request({
        url:"/teacher/teacherList",
        method:"post",
        data
    })
}

export function addTeacher(data){
    return request({
        url:"/teacher/addTeacher",
        method:"post",
        data
    })
}

export function editTeacher(data) {
    return request({
        url: '/teacher/editTeacher',
        method: 'post',
        data
    })
}
export function deletes(data) {
    return request({
        url: '/teacher/delete',
        method: 'post',
        data
    })
}
export function batchDelete(data) {
    return request({
        url: '/teacher/batchDelete',
        method: 'post',
        data
    })
}