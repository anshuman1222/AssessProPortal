import axios from "axios"
import {
    loadResultRequest,
    loadResultSuccess,
    loadResultFail,
    loadTestPaperFail,
    loadTestPaperRequest,
    loadTestPaperSuccess,
    loadTestPaperQuestionRequest,
    loadTestPaperQuestionSuccess,
    loadTestPaperQuestionFail
} from "../reducers/resultReducer"

export const getCompletedTests = (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return async (dispatch) => {
        try {
            dispatch(loadResultRequest());
            const { data } = await axios.get('https://exam-portal-backend-version-1.onrender.com/api/user/getAllCompletedTest', config);
            dispatch(loadResultSuccess(data));
        } catch (error) {
            dispatch(loadResultFail(error.message));
        }
    };
};

export const getQuestions = (token, ids) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
       queids:ids
    };
    return async (dispatch) => {
        try {
            dispatch(loadTestPaperQuestionRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/getTestQuestion', bodyParameters, config);
            dispatch(loadTestPaperQuestionSuccess(data));
        } catch (error) {
            dispatch(loadTestPaperQuestionFail(error.message));
        }
    };
};

export const getResultByTestId = (token, id) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        testid: id,
    };
    return async (dispatch) => {
        try {
            dispatch(loadTestPaperRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/getResultMainDetailsByTestId', bodyParameters, config);
            dispatch(getQuestions(token,data.result.questions));
            dispatch(loadTestPaperSuccess(data));
        } catch (error) {
            dispatch(loadTestPaperFail(error.message));
        }
    };
};

export const getResultByTeacherByTestId = (token, id , userid) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        testid: id,
        userid:userid
    };
    return async (dispatch) => {
        try {
            dispatch(loadTestPaperRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/getResultByTeacher', bodyParameters, config);
            dispatch(getQuestions(token, data.result.questions));
            dispatch(loadTestPaperSuccess(data));
        } catch (error) {
            dispatch(loadTestPaperFail(error.message));
        }
    };
};

