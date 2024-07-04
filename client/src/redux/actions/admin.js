import axios from "axios";
import {
    loginSuccess,
    loginRequest,
    loginFail,
    logoutSuccess,
    logoutFail,
    logoutRequest,
    loadDashBoardRequest,
    loadDashboardFail,
    loadDashboardSuccess
} from "../reducers/adminReducer";



export const adminlogin = (username, password) => {
    return async (dispatch) => {
        try {
            dispatch(loginRequest());

            const { data } = await axios.post(
                'https://exam-portal-backend-version-1.onrender.com/api/adminlogin',
                { username: username, password: password },
                {
                    headers: {
                        "Content-type": "application/json",
                    },

                    withCredentials: true,
                }
            );
            dispatch(loginSuccess(data));
        } catch (error) {
            dispatch(loginFail(error.message));
        }
    };
};

export const adminlogout = () => async (dispatch) => {
    try {
        dispatch(logoutRequest());
        dispatch(logoutSuccess("logout successfully"));
    } catch (error) {
        dispatch(logoutFail("logout unsuccessful"));
    }
};

export const getDashboardCount= (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return async (dispatch) => {
        try {
            dispatch(loadDashBoardRequest());
            const { data } = await axios.get('https://exam-portal-backend-version-1.onrender.com/api/admin/getDashboardCount', config);
            dispatch(loadDashboardSuccess(data));
        } catch (error) {
            dispatch(loadDashboardFail(error.message));
        }
    };
};