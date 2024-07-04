import axios from "axios";
import {
    loadTaskFail,
    loadTaskRequest,
    loadTaskSuccess,
    TaskRequest,
    TaskSuccess,
    TaskFail,
    TaskIdRequest,
    TaskIdSuccess,
    TaskIdFail,
    loadRankListRequest,
    loadRankListSuccess,
    loadRankListFail
} from "../reducers/taskReducer"
import { getPaperByIds } from "./question";
export const createTask = (title,duration,paper,token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        title: title,
        duration : duration*60,
        questions:paper
    };
    return async (dispatch) => {
        try {
            dispatch(TaskRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/createTest', bodyParameters, config);
            dispatch(TaskSuccess(data));
        } catch (error) {
            dispatch(TaskFail(error.message));
        }
    };
};

export const getAllTasks = (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return async (dispatch) => {
        try {
            dispatch(loadTaskRequest());
            const { data } = await axios.get('https://exam-portal-backend-version-1.onrender.com/api/user/getAllTest', config);
            dispatch(loadTaskSuccess(data.testlist));
        } catch (error) {
            dispatch(loadTaskFail(error.message));
        }
    };
};

export const getTestById = (token, id) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        testid: id,
    };
    return async (dispatch) => {
        try {
            dispatch(TaskIdRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/getTestById', bodyParameters, config);
            dispatch(getPaperByIds(token,data?.test?.questions));
            dispatch(TaskIdSuccess(data.test));
        } catch (error) {
            dispatch(TaskIdFail(error.message));
        }
    };
};

export const getRankListByTestId = (token, id) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        testid: id,
    };
    return async (dispatch) => {
        try {
            dispatch(loadRankListRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/getRankListByTestId', bodyParameters, config);
            dispatch(loadRankListSuccess(data));
        } catch (error) {
            dispatch(loadRankListFail(error.message));
        }
    };
};

