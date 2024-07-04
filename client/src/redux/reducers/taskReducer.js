import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    loading: false,
    message: null,
    error: null,
    taskList: null,
    task: null,
    taskLoading: false,
    ranklist:null,
};
import { toast } from "react-toastify";
const TaskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        loadTaskRequest: (state) => {
            state.loading = true;
        },
        loadTaskSuccess: (state, action) => {
            state.loading = false;
            state.taskList = action.payload;
        },
        loadTaskFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        loadRankListRequest: (state) => {
            state.loading = true;
        },
        loadRankListSuccess: (state, action) => {
            state.loading = false;
            state.ranklist = action.payload.ranklist;
        },
        loadRankListFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        TaskRequest: (state) => {
            state.loading = true;
        },
        TaskSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            toast.success(state.message);

        },
        TaskFail: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
        TaskIdRequest: (state) => {
            state.taskLoading = true;
        },
        TaskIdSuccess: (state, action) => {
            state.taskLoading = false;
            state.task = action.payload;
        },
        TaskIdFail: (state, action) => {
            state.taskLoading = false;
            state.message = action.payload;
            toast.error(state.message);
        },
    },
});
export const {
    loadTaskRequest,
    loadTaskFail,
    loadTaskSuccess,
    TaskRequest,
    TaskSuccess,
    TaskFail,
    TaskIdRequest,
    TaskIdSuccess,
    TaskIdFail,
    loadRankListRequest,
    loadRankListSuccess,
    loadRankListFail
} = TaskSlice.actions;
export default TaskSlice.reducer;    