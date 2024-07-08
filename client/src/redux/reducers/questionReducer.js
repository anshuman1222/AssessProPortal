import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
    loading: false,
    message: null,
    error: null,
    questionList: null,
    questions : null,
    questionsLoading : false,
    editquestion:null,
    generatedQuestion:null
};
const QuestionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        loadQuestionRequest: (state) => {
            state.loading = true;
        },
        loadQuestionSuccess: (state, action) => {
            state.loading = false;
            state.questionList = action.payload;
        },
        loadQuestionFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        QuestionRequest: (state) => {
            state.loading = true;
        },
        QuestionSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            action.payload.success ? toast.success(state.message) : toast.error(state.message);
        },
        QuestionFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        QuestionIdRequest: (state) => {
            state.questionsLoading = true;
        },
        QuestionIdSuccess: (state, action) => {
            state.questionsLoading = false;
            state.questions = action.payload;
        },
        QuestionIdFail: (state, action) => {
            state.questionsLoading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        EditQuestionSuccess:(state,action)=>{
            state.editquestion = action.payload;
        },
        GeneratedQuestionSuccess: (state, action) => {
            state.generatedQuestion = action.payload;
        },
        GeneratedQuestionFail: (state, action) => {
            state.message = action.payload;
            toast.error(state.message);
        }
    },
});
export const {
    loadQuestionRequest,
    loadQuestionFail,
    loadQuestionSuccess,
    QuestionRequest,
    QuestionFail,
    QuestionSuccess,
    QuestionIdSuccess,
    QuestionIdRequest,
    QuestionIdFail,
    EditQuestionSuccess,
    GeneratedQuestionSuccess,
    GeneratedQuestionFail
} = QuestionSlice.actions;
export default QuestionSlice.reducer;    