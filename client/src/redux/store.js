
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import taskReducer from "./reducers/taskReducer";
import adminReducer from "./reducers/adminReducer";
import subjectReducer from "./reducers/subjectReducer";
import teacherReducer from "./reducers/teacherReducer";
import studentReducer from "./reducers/studentReducer";
import questionReducer from "./reducers/questionReducer";
import testReducer from "./reducers/testReducer";
import answersheetReducer from "./reducers/answersheetReducer";
import resultReducer from "./reducers/resultReducer";
const store = configureStore({
    reducer: {
        user: userReducer,
        task: taskReducer,
        admin: adminReducer,
        subject: subjectReducer,
        teacher:teacherReducer,
        student:studentReducer,
        question:questionReducer,
        test:testReducer,
        answersheet:answersheetReducer,
        result:resultReducer
    },
});
export default store;