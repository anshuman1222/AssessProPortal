import axios from "axios";
import {
    loadTeacherFail,
    loadTeacherRequest,
    loadTeacherSuccess,
    TeacherFail,
    TeacherRequest,
    TeacherSuccess
} from "../reducers/teacherReducer"

export const getAllTeachers = (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return async (dispatch) => {
        try {
            dispatch(loadTeacherRequest());
            const { data } = await axios.get('https://exam-portal-backend-version-1.onrender.com/api/admin/getAllTeachers', config);
            dispatch(loadTeacherSuccess(data.teachers));
        } catch (error) {
            dispatch(loadTeacherFail(error.message));
        }
    };
};

export const blockTeacher = (token, id) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        _id: id
    };
    return async (dispatch) => {
        try {
            dispatch(TeacherRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/admin/removeUser', bodyParameters, config);
            dispatch(TeacherSuccess(data));
            dispatch(getAllTeachers(token));
        } catch (error) {
            dispatch(TeacherFail(error.message));
        }
    };
}

export const unblockTeacher = (token, id) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        _id: id
    };
    return async (dispatch) => {
        try {
            dispatch(TeacherRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/admin/unblockUser', bodyParameters, config);
            dispatch(TeacherSuccess(data));
            dispatch(getAllTeachers(token));
        } catch (error) {
            dispatch(TeacherFail(error.message));
        }
    };
}

export const addTeacher = (token, username , email , password) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        username: username,
        email:email,
        password:password
    };
    return async (dispatch) => {
        try {
            dispatch(TeacherRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/admin/register', bodyParameters, config);
            dispatch(TeacherSuccess(data));
            dispatch(getAllTeachers(token));
        } catch (error) {
            dispatch(TeacherFail(error.message));
        }
    };
}