import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
    loading: false,
    message: null,
    error: null,
    testResults:null,
    testpaper:null,
    testpaperquestions:null,
};

const ResultSlice = createSlice({
    name: "sheet",
    initialState,
    reducers: {
        loadResultRequest: (state) => {
            state.loading = true;
        },
        loadResultSuccess: (state, action) => {
            state.loading = false;
            state.testResults = action.payload.completedtestlist;
        },
        loadResultFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        loadTestPaperRequest: (state) => {
            state.loading = true;
        },
        loadTestPaperSuccess: (state, action) => {
            state.loading = false;
            state.testpaper = action.payload?.result;
        },
        loadTestPaperFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        loadTestPaperQuestionRequest: (state) => {
            state.loading = true;
        },
        loadTestPaperQuestionSuccess: (state, action) => {
            state.loading = false;
            state.testpaperquestions = action.payload?.questions;
        },
        loadTestPaperQuestionFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
    },
});

export const {
loadResultRequest,
loadResultSuccess,
loadResultFail,
loadTestPaperFail,
loadTestPaperRequest,
loadTestPaperSuccess,
loadTestPaperQuestionRequest,
loadTestPaperQuestionSuccess,
loadTestPaperQuestionFail
} = ResultSlice.actions;
export default ResultSlice.reducer;    