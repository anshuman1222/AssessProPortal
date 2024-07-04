import axios from "axios";
import {
    loadStudentFail,
    loadStudentRequest,
    loadStudentSuccess,
    StudentFail,
    StudentRequest,
    StudentSuccess
} from "../reducers/studentReducer"

export const getAllStudents = (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return async (dispatch) => {
        try {
            dispatch(loadStudentRequest());
            const { data } = await axios.get('https://exam-portal-backend-version-1.onrender.com/api/admin/getAllStudent', config);
            dispatch(loadStudentSuccess(data.students));
        } catch (error) {
            dispatch(loadStudentFail(error.message));
        }
    };
};

export const blockStudent = (token, id) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        _id: id
    };
    return async (dispatch) => {
        try {
            dispatch(StudentRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/admin/removeUser', bodyParameters, config);
            dispatch(StudentSuccess(data));
            dispatch(getAllStudents(token));
        } catch (error) {
            dispatch(StudentFail(error.message));
        }
    };
}

export const unblockStudent = (token, id) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        _id: id
    };
    return async (dispatch) => {
        try {
            dispatch(StudentRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/admin/unblockUser', bodyParameters, config);
            dispatch(StudentSuccess(data));
            dispatch(getAllStudents(token));
        } catch (error) {
            dispatch(StudentFail(error.message));
        }
    };
}

export const addStudent = (token, username, email, password) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        username: username,
        email: email,
        password: password
    };
    return async (dispatch) => {
        try {
            dispatch(StudentRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/public/register', bodyParameters, config);
            dispatch(StudentSuccess(data));
            dispatch(getAllStudents(token));
        } catch (error) {
            dispatch(StudentFail(error.message));
        }
    };
}