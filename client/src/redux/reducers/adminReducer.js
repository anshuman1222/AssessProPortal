import { toast } from 'react-toastify';
import { createSlice } from "@reduxjs/toolkit";
import { getAdminFromLocalStorage, addAdminToLocalStorage, removeAdminFromLocalStorage } from "../../utils";
import { act } from 'react';
const { loading, isAuthenticated, user, message, error , token} = getAdminFromLocalStorage();
const initialState = {
    loading: loading,
    isAuthenticated: isAuthenticated,
    user: user,
    message: message,
    error: error,
    isSidebarOpen: false,
    token : token ,
    dashboardDetails : null
};
const AdminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            addAdminToLocalStorage(state);
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            if(action.payload.success){
                toast.success(state.message);
                state.isAuthenticated = true;
                state.user = action.payload.admin;
                state.token = action.payload.token;
                addAdminToLocalStorage(state);
            }
            else{
                toast.error(state.message);
            }
        },
        loginFail: (state, action) => {
            toast.error(action.payload.message);
            state.loading = false;
            state.isAuthenticated = false;
            state.message = action.payload;
            toast.error(state.message);
            addAdminToLocalStorage(state);
        },
        adminsetOpenSidebar: (state, action) => {
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
            state.token = null;
            removeAdminFromLocalStorage();
            toast.success(state.message);
        },
        logoutFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
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
    adminsetOpenSidebar,
    logoutRequest,
    logoutSuccess,
    logoutFail,
    loadDashBoardRequest,
    loadDashboardFail,
    loadDashboardSuccess
} = AdminSlice.actions;
export default AdminSlice.reducer;    