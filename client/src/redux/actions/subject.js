import axios from "axios";
import {
   loadSubjectFail,
   loadSubjectRequest,
   loadSubjectSuccess,
   SubjectFail,
   SubjectRequest,
   SubjectSuccess
} from "../reducers/subjectReducer"

export const getAllSubjects = (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return async (dispatch) => {
        try {
            dispatch(loadSubjectRequest());
            const { data } = await axios.get('https://exam-portal-backend-version-1.onrender.com/api/admin/getAllSubjects', config );
            dispatch(loadSubjectSuccess(data.subjects));
        } catch (error) {
            dispatch(loadSubjectFail(error.message));
        }
    };
};

export const getAllActiveSubjects = (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return async (dispatch) => {
        try {
            dispatch(loadSubjectRequest());
            const { data } = await axios.get('https://exam-portal-backend-version-1.onrender.com/api/user/getAllSubjects', config);
            dispatch(loadSubjectSuccess(data.subjects));
        } catch (error) {
            dispatch(loadSubjectFail(error.message));
        }
    };
};

export const blockSubject = (token,id) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        _id: id
    };
    return async (dispatch) => {
        try {
            dispatch(SubjectRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/admin/removeSubject', bodyParameters ,config);
            dispatch(SubjectSuccess(data));
            dispatch(getAllSubjects(token));
        } catch (error) {
            dispatch(SubjectFail(error.message));
        }
    };
}

export const unblockSubject = (token, id) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        _id: id
    };
    return async (dispatch) => {
        try {
            dispatch(SubjectRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/admin/unblockSubject', bodyParameters, config);
            dispatch(SubjectSuccess(data));
            dispatch(getAllSubjects(token));
        } catch (error) {
            dispatch(SubjectFail(error.message));
        }
    };
}

export const addSubject = (token, name) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        name: name
    };
    return async (dispatch) => {
        try {
            dispatch(SubjectRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/admin/addSubject', bodyParameters, config);
            dispatch(SubjectSuccess(data));
            dispatch(getAllSubjects(token));
        } catch (error) {
            dispatch(SubjectFail(error.message));
        }
    };
}