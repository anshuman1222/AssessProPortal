import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
const initialState = {
    loading: false,
    message: null,
    error: null,
    teacherList: null
};
const TeacherSlice = createSlice({
    name: "teacher",
    initialState,
    reducers: {
        loadTeacherRequest: (state) => {
            state.loading = true;
        },
        loadTeacherSuccess: (state, action) => {
            state.loading = false;
            state.teacherList = action.payload;
        },
        loadTeacherFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        TeacherRequest: (state) => {
            state.loading = true;
        },
        TeacherSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            action.payload.success ? toast.success(state.message) : toast.error(state.message);
        },
        TeacherFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
    },
});
export const {
   loadTeacherFail,
   loadTeacherRequest,
   loadTeacherSuccess,
   TeacherFail,
   TeacherRequest,
   TeacherSuccess
} = TeacherSlice.actions;
export default TeacherSlice.reducer;    