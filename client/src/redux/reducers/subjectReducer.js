import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
const initialState = {
    loading: false,
    message: null,
    error: null,
    subjectList: null
};
const SubjectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {
        loadSubjectRequest: (state) => {
            state.loading = true;
        },
        loadSubjectSuccess: (state, action) => {
            state.loading = false;
            state.subjectList = action.payload;
        },
        loadSubjectFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        SubjectRequest: (state) => {
            state.loading = true;
        },
        SubjectSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            action.payload.success ? toast.success(state.message) : toast.error(state.message);
        },
        SubjectFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
    },
});
export const {
    loadSubjectRequest,
    loadSubjectFail,
    loadSubjectSuccess,
    SubjectRequest,
    SubjectFail,
    SubjectSuccess
} = SubjectSlice.actions;
export default SubjectSlice.reducer;    