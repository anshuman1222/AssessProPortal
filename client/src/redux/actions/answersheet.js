import axios from "axios"
import {
    loadAnswerSheetRequest,
    loadAnswerSheetSuccess,
    loadAnswerSheetFail,
    loadTestQuestionsRequest,
    loadTestQuestionsSuccess,
    loadTestQuestionsFail,
    saveAnswerSuccess,
    saveAnswerFail,
    saveAnswerRequest
} from "../reducers/answersheetReducer"

export const getPaperQuestions = (token, sheetdata) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    var addStartTime = (sheetdata.answersheet.startTime === undefined)
    const bodyParameters = {
        answersheetid: sheetdata.answersheet._id,
        addStartTime:addStartTime,
        questionid: sheetdata.questions,
    };
    return async (dispatch) => {
        try {
            dispatch(loadTestQuestionsRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/getQuenStarttime', bodyParameters, config);
            dispatch(loadTestQuestionsSuccess(data));
        } catch (error) {
            dispatch(loadTestQuestionsFail(error.message));
        }
    };
};

export const startTestAction = (token, id , setView , startTimer) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        testid: id,
    };
    return async (dispatch) => {
        try {
            dispatch(loadAnswerSheetRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/startTest', bodyParameters, config);
            dispatch(loadAnswerSheetSuccess(data))
            dispatch(getPaperQuestions(token, data))
            startTimer();
        } catch (error) {
            dispatch(loadAnswerSheetFail(error.message));
        }
    };
};

export const saveTest = (token, answersheetid , answers) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const arr = Object.values(answers);
    const bodyParameters = {
        answersheetid:answersheetid,
        answers:arr
    };
    return async (dispatch) => {
        try {
            dispatch(saveAnswerRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/saveAnswer', bodyParameters, config);
            dispatch(saveAnswerSuccess(data));
        } catch (error) {
            dispatch(saveAnswerFail(error.message));
        }
    };
};

export const endTest = (token, answersheetid, answers) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const arr = Object.values(answers);
    const bodyParameters = {
        answersheetid: answersheetid,
        answers: arr
    };
    return async (dispatch) => {
        try {
            dispatch(saveAnswerRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/endTest', bodyParameters, config);
            dispatch(saveAnswerSuccess(data));
        } catch (error) {
            dispatch(saveAnswerFail(error.message));
        }
    };
};

