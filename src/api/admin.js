import request from "../utils/request";

export const showAllTeacher = async (data) => {
  const responseData = await request.get("/teacher/showAllTeacher");
  return responseData;
};

export const showAllStudent = async (data) => {
  const responseData = await request.get("/user/showAllStudent");
  return responseData;
};

export const showAllTime = async (data) => {
  const responseData = await request.get("/time/showAllTime");
  return responseData;
};

export const adminLogin = async (data) => {
  const responseData = await request.post("/admin/login", data);
  return responseData;
};

export const addOneStudent = async (data) => {
  const responseData = await request.post("/user/addOneStudent", data);
  return responseData;
};

export const addOneTeacher = async (data) => {
  const responseData = await request.post("/teacher/addOneTeacher", data);
  return responseData;
};

export const deleteOneTeacher = async (data) => {
  const responseData = await request.delete(`/teacher/deleteOneTeacher/${data}`);
  return responseData;
};

export const deleteOneStudent = async (data) => {
    const responseData = await request.delete(`/user/deleteOneStudent/${data}`);
    return responseData;
  };

export const showTeacherSituation = async (data) => {
const responseData = await request.get(`/choose/showTeacherSituation`);
return responseData;
};

export const showStudentSituation = async (data) => {
    const responseData = await request.get("/choose/showStudentSituation");
    return responseData;
    };
    

export const updateTime = async (data) => {
    const responseData = await request.put("/time/updateTime",data);
    return responseData;
    };

    
export const updateOneTeacher = async (data) => {
  const responseData = await request.put("/teacher/updateOneTeacher",data);
  return responseData;
  };
  
export const updateOneStudent = async (data) => {
  const responseData = await request.put("/user/updateOneStudent",data);
  return responseData;
  };