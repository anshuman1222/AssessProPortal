import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
    loading: false,
    saveloading:false,
    message: null,
    error: null,
    answersheet:null,
    questionids:null,
    testquestions:null,
    startTime:null
};

const AnswerSheetSlice = createSlice({
    name: "answersheet",
    initialState,
    reducers: {
        loadAnswerSheetRequest: (state) => {
            state.loading = true;
        },
        loadAnswerSheetSuccess: (state, action) => {
            state.loading = false;
            state.answersheet = action.payload.answersheet;
            state.questionids = action.payload.questions;
            state.message = action.payload.message;
            action.payload.success ? toast.success(state.message) : toast.error(state.message);
        },
        loadAnswerSheetFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        loadTestQuestionsRequest: (state) => {
            state.loading = true;
        },
        loadTestQuestionsSuccess: (state, action) => {
            state.loading = false;
            state.testquestions = action.payload.questions;
            state.startTime = action.payload.startTime;
            state.message = action.payload.message;
            action.payload.success ? toast.success(state.message) : toast.error(state.message);
        },
        loadTestQuestionsFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        saveAnswerRequest: (state) => {
            state.saveloading = true;
        },
        saveAnswerSuccess: (state, action) => {
            state.saveloading=false;
            state.message = action.payload.message
            action.payload.success ? toast.success(state.message) : toast.error(state.message);
        },
        saveAnswerFail: (state, action) => {
            state.saveloading=false;
            state.message = action.payload;
            toast.error(state.message);
        },
    },
});

export const {
   loadAnswerSheetRequest,
   loadAnswerSheetSuccess,
   loadAnswerSheetFail,
   loadTestQuestionsRequest,
   loadTestQuestionsSuccess,
   loadTestQuestionsFail,
   saveAnswerSuccess,
   saveAnswerFail,
   saveAnswerRequest
} = AnswerSheetSlice.actions;
export default AnswerSheetSlice.reducer;    