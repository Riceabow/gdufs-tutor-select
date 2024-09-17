import request from '../utils/request'


export const studentLogin = async(data) =>{
     const responseData = await request.post("/user/login",data)
     return responseData
  }

export const showStudentResult = async (data) => {
const responseData = await request.get("/choose/showStudentResult",{params: data });
return responseData;
};

export const getUserDetail = async (data) => {
  const responseData = await request.get("/user/getUserDetail",);
  return responseData;
  };

export const showTeacherToStudent = async (data) => {
  const responseData = await request.get("/teacher/showTeacherToStudent",);
  return responseData;
  };

export const chooseTeacher = async (data) => {
  const responseData = await request.post("/choose/chooseTeacher",data);
  return responseData;
  };

  export const showAllTime = async (data) => {
    const responseData = await request.get("/time/showAllTime");
    return responseData;
  };


  export const updatePassword = async (data) => {
    const responseData = await request.post("/user/updatePassword",data);
    return responseData;
    };
  