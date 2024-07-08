import { createSlice } from "@reduxjs/toolkit";
import { getUserFromLocalStorage, addUserToLocalStorage, removeUserFromLocalStorage } from "../../utils";
const { loading, isAuthenticated, user, message, error , token } = getUserFromLocalStorage();
import { toast } from 'react-toastify';
import { act } from "react";
const initialState = {
    loading: loading,
    isAuthenticated: isAuthenticated,
    user: user,
    message: message,
    error: error,
    isSidebarOpen: false,
    token:token,
    passwordloading:false,
    dashboardDetails: null
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            addUserToLocalStorage(state);
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            if(action.payload.success){
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            addUserToLocalStorage(state);
            toast.success(state.message);
            }
            else{
             toast.error(state.message);
            }
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.message = action.payload;
            addUserToLocalStorage(state);
            toast.error(state.message);
        },
        registerRequest: (state) => {
            state.loading = true;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            action.payload.success ? toast.success(state.message) : toast.error(state.message) ;
        },
        registerFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        setOpenSidebar: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
        logoutRequest: (state) => {
            state.loading = true;
        },
        logoutSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.message = action.payload;
            toast.success(state.message);
            removeUserFromLocalStorage();
        },
        logoutFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        changePasswordRequest: (state) => {
            state.passwordloading = true;
        },
        changePasswordSuccess: (state, action) => {
            state.passwordloading = false;
            state.message = action.payload.message;
            action.payload.success ? toast.success(state.message) : toast.error(state.message);
        },
        changePasswordFail: (state, action) => {
            state.passwordloading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        loadDashBoardRequest: (state) => {
            state.loading = true;
        },
        loadDashboardSuccess: (state, action) => {
            state.loading = false;
            state.dashboardDetails = action.payload;
        },
        loadDashboardFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
    },
});
export const {
    loginRequest,
    loginSuccess,
    loginFail,
    setOpenSidebar,
    logoutRequest,
    logoutSuccess,
    logoutFail,
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFail,
    loadDashBoardRequest,
    loadDashboardSuccess,
    loadDashboardFail,
    registerRequest,
    registerSuccess,
    registerFail
} = userSlice.actions;
export default userSlice.reducer;    