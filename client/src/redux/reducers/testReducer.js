import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
    loading: false,
    message: null,
    error: null,
    registerExamList: null,
    upcomingExamList:null,
};
const TestSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        loadRegisterTestRequest: (state) => {
            state.loading = true;
        },
        loadRegisterTestSuccess: (state, action) => {
            state.loading = false;
            state.registerExamList = action.payload;
        },
        loadRegisterTestFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        RegisterTestRequest: (state) => {
            state.loading = true;
        },
        RegisterTestSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            action.payload.success ? toast.success(state.message) : toast.error(state.message);
        },
        RegisterTestFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        loadUpcomingTestRequest: (state) => {
            state.loading = true;
        },
        loadUpcomingTestSuccess: (state, action) => {
            state.loading = false;
            state.upcomingExamList = action.payload;
        },
        loadUpcomingTestFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
    },
});
export const {
   loadRegisterTestFail,
   loadRegisterTestRequest,
   loadRegisterTestSuccess,
   RegisterTestFail,
   RegisterTestRequest,
   RegisterTestSuccess,
   loadUpcomingTestFail,
   loadUpcomingTestRequest,
   loadUpcomingTestSuccess
} = TestSlice.actions;
export default TestSlice.reducer;    