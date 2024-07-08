import axios from "axios";
import {
    loginSuccess,
    loginRequest,
    loginFail,
    logoutSuccess,
    logoutFail,
    logoutRequest,
    changePasswordRequest,
    changePasswordFail,
    changePasswordSuccess,
    loadDashBoardRequest,
    loadDashboardSuccess,
    loadDashboardFail,
    registerRequest,
    registerFail,
    registerSuccess
} from "../reducers/userReducer";
export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(loginRequest());

            const { data } = await axios.post(
                'https://exam-portal-backend-version-1.onrender.com/api/login',
                { email: email, password: password },
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

export const registerStudent = (username, email, password) => {
    const bodyParameters = {
        username: username,
        email: email,
        password: password
    };
    return async (dispatch) => {
        try {
            dispatch(registerRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/public/register', bodyParameters);
            dispatch(registerSuccess(data));
        } catch (error) {
            dispatch(registerFail(error.message));
        }
    };
}
export const logout = () => async (dispatch) => {
    try {
        dispatch(logoutRequest());
        dispatch(logoutSuccess("logout successfully"));
    } catch (error) {
        dispatch(logoutFail("logout unsuccessful"));
    }
};
export const changePassword = (token , userid , password) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        userid:userid,
        password:password
    };
    return async (dispatch) => {
        try {
            dispatch(changePasswordRequest());

            const { data } = await axios.post(
                'https://exam-portal-backend-version-1.onrender.com/api/user/changepassword'
                , bodyParameters , config
            );
            dispatch(changePasswordSuccess(data));
        } catch (error) {
            dispatch(changePasswordFail(error.message));
        }
    };
};

export const getTeacherDashboardCount = (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return async (dispatch) => {
        try {
            dispatch(loadDashBoardRequest());
            const { data } = await axios.get('https://exam-portal-backend-version-1.onrender.com/api/user/getDashboardCount', config);
            dispatch(loadDashboardSuccess(data));
        } catch (error) {
            dispatch(loadDashboardFail(error.message));
        }
    };
};