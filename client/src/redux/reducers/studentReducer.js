import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
const initialState = {
    loading: false,
    message: null,
    error: null,
    studentList: null
};
const StudentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        loadStudentRequest: (state) => {
            state.loading = true;
        },
        loadStudentSuccess: (state, action) => {
            state.loading = false;
            state.studentList = action.payload;
        },
        loadStudentFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        StudentRequest: (state) => {
            state.loading = true;
        },
        StudentSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            action.payload.success ? toast.success(state.message) : toast.error(state.message);
        },
        StudentFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
    },
});
export const {
    loadStudentFail,
    loadStudentRequest,
    loadStudentSuccess,
    StudentFail,
    StudentRequest,
    StudentSuccess
} = StudentSlice.actions;
export default StudentSlice.reducer;    