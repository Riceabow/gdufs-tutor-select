import request from '../utils/request'


export const teacherLogin = async(data) =>{
     const responseData = await request.post("/teacher/login",data)
     return responseData
  }

export const showSelectedStudent = async(data) =>{
   const responseData = await request.post("/teacher/showSelectedStudent",data)
   return responseData
}

export const selectStudent = async(data) =>{
   const responseData = await request.post("/teacher/selectStudent",data)
   return responseData
}

export const notSelectStudent = async(data) =>{
   const responseData = await request.post("/teacher/notSelectStudent",data)
   return responseData
}


export const getTeacherDetail = async(data) =>{
   const responseData = await request.get("/teacher/getTeacherDetail")
   return responseData
}



export const updateTeacherPassword = async(data) =>{
   const responseData = await request.post("/teacher/updatePassword",data)
   return responseData
}