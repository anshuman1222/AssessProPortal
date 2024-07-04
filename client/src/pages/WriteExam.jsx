import React, { useState, useEffect } from 'react'
import Instructions from '../components/Instructions'
import ResultFeedback from '../components/ResultFeedback';
import ReviewTestQuestion from '../components/ReviewTestQuestion';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import { getTestById } from '../redux/actions/task';
import { startTestAction } from '../redux/actions/answersheet';
import { endTest } from '../redux/actions/answersheet';
import Loading from "../components/Loader";
import QuestionPaper from '../components/Exam/QuestionPaper';
const WriteExam = () => {
    const params = useParams();
    const id = params?.id || "";
    const [view, setView] = useState("instructions");
    const { token } = useSelector((state) => state.user);
    const { taskLoading, task } = useSelector((state) => state.task);
    const { loading, testquestions , answersheet } = useSelector((state) => state.answersheet);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [secondsLeft = 0, setSecondsLeft] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [intervalId, setIntervalId] = useState(null);
    const [timeUp, setTimeUp] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTestById(token, id));
    }, []);
    useEffect(() => {
        setSecondsLeft(formatTime(task?.duration));
    }, [task]);
    useEffect(() => {
        if (timeUp && view === "questions") {
            clearInterval(intervalId);
            setView("review");
            dispatch(endTest(token,answersheet?._id,selectedOptions));
        }
    }, [timeUp]);
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const min = Math.floor((seconds % 3600) / 60);
        const sec = seconds % 60;
        const hrsStr = hrs.toString().padStart(2, '0');
        const minStr = min.toString().padStart(2, '0');
        const secStr = sec.toString().padStart(2, '0');
        return `${hrsStr}:${minStr}:${secStr}`;
    }
    const startTimer = () => {
        let totalSeconds = task?.duration;
        const intervalId = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds = totalSeconds - 1;
                setSecondsLeft(formatTime(totalSeconds));
            } else {
                setTimeUp(true);
            }
        }, 1000);
        setIntervalId(intervalId);
    };
    const startTest = () => {

        dispatch(startTestAction(token, id , setView , startTimer));

    };

    return taskLoading || loading ? (
        <div>
            <Loading />
        </div>
    ) : (<>
        <div className='w-full'>
            {
                view === "instructions" && task != null && (
                    <Instructions
                        examData={task}
                        setView={setView}
                        startTest={startTest}
                    />
                )
            }
            {
                view === "questions" && task != null && testquestions != null && (
                    <QuestionPaper task={task} questions={testquestions} secondsLeft={secondsLeft} selectedQuestionIndex={selectedQuestionIndex} setSelectedQuestionIndex={setSelectedQuestionIndex} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} intervalId={intervalId} setTimeUp={setTimeUp} setView={setView} />
                )
            }
            {
                view === "review"  && testquestions != null && (
                        <ReviewTestQuestion questions={testquestions} selectedOptions={selectedOptions} setView={setView} />
                )
            }
            {
                view === "result" && (
                    <ResultFeedback />
                )
            }
        </div>
    </>
    )
}

export default WriteExam
