import axios from "axios";
import {
    loadRegisterTestFail,
    loadRegisterTestRequest,
    loadRegisterTestSuccess,
    RegisterTestFail,
    RegisterTestRequest,
    RegisterTestSuccess,
    loadUpcomingTestFail,
    loadUpcomingTestRequest,
    loadUpcomingTestSuccess
} from "../reducers/testReducer"

export const getAllRegisterTest = (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return async (dispatch) => {
        try {
            dispatch(loadRegisterTestRequest());
            const { data } = await axios.get('https://exam-portal-backend-version-1.onrender.com/api/user/getAllTestStudent', config);
            dispatch(loadRegisterTestSuccess(data.testlist));
        } catch (error) {
            dispatch(loadRegisterTestFail(error.message));
        }
    };
};

export const getAllUpcomingTest = (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return async (dispatch) => {
        try {
            dispatch(loadUpcomingTestRequest());
            const { data } = await axios.get('https://exam-portal-backend-version-1.onrender.com/api/user/getUpcomingTests', config);
            dispatch(loadUpcomingTestSuccess(data.upcomingtestlist));
        } catch (error) {
            dispatch(loadUpcomingTestFail(error.message));
        }
    };
};

export const testRegistration = (token , id) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        testid: id,
    };
    return async (dispatch) => {
        try {
            dispatch(RegisterTestRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/testRegistration', bodyParameters ,config);
            dispatch(RegisterTestSuccess(data));
            dispatch(getAllRegisterTest(token));
        } catch (error) {
            dispatch(RegisterTestFail(error.message));
        }
    };
};