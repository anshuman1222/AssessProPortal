import axios from "axios";
import {
    loadQuestionRequest,
    loadQuestionFail,
    loadQuestionSuccess,
    QuestionRequest,
    QuestionFail,
    QuestionSuccess,
    QuestionIdSuccess,
    QuestionIdRequest,
    QuestionIdFail,
    GeneratedQuestionSuccess,
    GeneratedQuestionFail
} from "../reducers/questionReducer"
import { toast } from "react-toastify";

import { GoogleGenerativeAI } from "@google/generative-ai";

export const getAiSuggestion = (subject) => {
    if(subject == [] || subject == null || subject == undefined){
          toast.info("Subject Not Selected");
          return;
    }

    const genAI = new GoogleGenerativeAI("AIzaSyCJ8vJjVyUxEbVM3W1DJK7_RcFeiasMYyY");

    let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });


    let prompt = `Generate A Question that can be asked in ${subject} Subject and return that question in json format that includes the following keys with their corresponding values in the question :
title: A string containing the question body.
explanation: A string containing the explanation for the question.
options: An array containing four strings, where exactly one string is the correct answer and the other three are incorrect.
marks: An integer representing the marks awarded for answering the question correctly.
answer: A string representing the correct answer, which should be one of the options in the options array.`
    return async (dispatch) => {
        try {
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();
            dispatch(GeneratedQuestionSuccess(JSON.parse(text)));
            toast.success("Fetched Successfully");
        } catch (error) {
            dispatch(GeneratedQuestionSuccess(null))
            dispatch(GeneratedQuestionFail(error.message))
        }
    };
};

export const getAllQuestions = (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return async (dispatch) => {
        try {
            dispatch(loadQuestionRequest());
            const { data } = await axios.get('https://exam-portal-backend-version-1.onrender.com/api/user/getAllQuestion', config);
            dispatch(loadQuestionSuccess(data.questions));
        } catch (error) {
            dispatch(loadQuestionFail(error.message));
        }
    };
};

export const getActiveQuestions = (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return async (dispatch) => {
        try {
            dispatch(loadQuestionRequest());
            const { data } = await axios.get('https://exam-portal-backend-version-1.onrender.com/api/user/getActiveQuestions', config);
            dispatch(loadQuestionSuccess(data.questions));
        } catch (error) {
            dispatch(loadQuestionFail(error.message));
        }
    };
};

export const getQuestionById = (token, id) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        id: id,
    };
    return async (dispatch) => {
        try {
            dispatch(QuestionIdRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/getQuestion', bodyParameters, config);
            dispatch(QuestionIdSuccess(data.question));
            return data;
        } catch (error) {
            dispatch(QuestionFail(error.message));
        }
    };
};

export const getPaperByIds = (token, ids) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        queids: ids,
    };
    return async (dispatch) => {
        try {
            dispatch(QuestionIdRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/getTestQuestion', bodyParameters, config);
            dispatch(QuestionIdSuccess(data.questions));
        } catch (error) {
            dispatch(QuestionIdFail(error.message));
        }
    };
};

export const blockQuestion = (token, id) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        id: id,
        status: false
    };
    return async (dispatch) => {
        try {
            dispatch(QuestionRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/changeQuestionStatus', bodyParameters, config);
            dispatch(QuestionSuccess(data));
            dispatch(getAllQuestions(token));
        } catch (error) {
            dispatch(QuestionFail(error.message));
        }
    };
}

export const unblockQuestion = (token, id) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        id: id,
        status: true
    };
    return async (dispatch) => {
        try {
            dispatch(QuestionRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/changeQuestionStatus', bodyParameters, config);
            dispatch(QuestionSuccess(data));
            dispatch(getAllQuestions(token));
        } catch (error) {
            dispatch(QuestionFail(error.message));
        }
    };
}

export const addQuestion = (token, body, explanation, options, subject, marks, answer) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        body: body,
        explanation: explanation,
        options: options,
        subject: subject,
        marks: marks,
        answer: answer
    };
    return async (dispatch) => {
        try {
            dispatch(QuestionRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/addQuestion', bodyParameters, config);
            dispatch(QuestionSuccess(data));
            dispatch(getAllQuestions(token));
        } catch (error) {
            dispatch(QuestionFail(error.message));
        }
    };
}

export const updateQuestion = (token, id, body, explanation, options, subject, marks, answer) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
        id: id,
        body: body,
        explanation: explanation,
        options: options,
        subject: subject,
        marks: marks,
        answer: answer
    };
    return async (dispatch) => {
        try {
            dispatch(QuestionRequest());
            const { data } = await axios.post('https://exam-portal-backend-version-1.onrender.com/api/user/updateQuestion', bodyParameters, config);
            dispatch(QuestionSuccess(data));
            dispatch(getAllQuestions(token));
        } catch (error) {
            dispatch(QuestionFail(error.message));
        }
    };
}