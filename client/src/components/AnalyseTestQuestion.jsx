import React, { useState } from 'react'
import Button from "./Button";
import Title from './Title';
import { MdCheck } from "react-icons/md";
import { MdClose } from "react-icons/md";
const AnalyseTestQuestion = ({ questions, selectedOptions , score  }) => {
    const calculate = () => {
        let totalScore = 0;
        questions?.map((question, index) => {
            totalScore = totalScore + question?.marks;
        })
        return totalScore
    };
    const [QuestionIndex, setQuestionIndex] = useState(0);
    return (
        <div className="flex flex-col gap-2">
            <div className='flex items-center justify-between mb-4'>
                <Title title={"Results"} />
                <div className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5 px-3 py-2 outline-none">
                    <span className="text-2xl">{score}/{calculate()} </span>
                </div>
            </div>
            <div className="flex  items-center justify-center ">
                <div className="bg-[#ffffff] p-8 rounded-lg w-full">
                    <h2 className="font-bold mb-4 flex items-center justify-between">
                        <div className='text-2xl'>
                            {QuestionIndex + 1} :{" "}
                            {questions[QuestionIndex]?.body}
                        </div>
                    </h2>
                    <h2 className="mb-4 flex items-center justify-between">
                        <div className=''>
                            Explanation :{" "}
                            {questions[QuestionIndex]?.explanation}
                        </div>
                    </h2>
                    <div className="space-y-4">
                        {questions[QuestionIndex].options.map((option, index) => {

                            return (
                                <div
                                    className={`px-4 py-3 rounded-md cursor-pointer transition-colors duration-300 ${ questions[QuestionIndex].answer===option
                                        ?
                                        " bg-green-200 text-primary-foreground  "
                                        : `${selectedOptions[QuestionIndex] === option && selectedOptions[QuestionIndex] !== questions[QuestionIndex].answer ? "bg-red-200 text-primary-foreground" :"hover:bg-slate-200"}`
                                        }`}
                                    key={index}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>
                                            {option}
                                        </span>
                                        {questions[QuestionIndex].answer === option && <MdCheck className="w-5 h-5 text-primary-foreground" />}
                                        {selectedOptions[QuestionIndex] === option && selectedOptions[QuestionIndex] !== questions[QuestionIndex].answer && <MdClose className="w-5 h-5 text-primary-foreground" /> }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex justify-between mt-6">
                        {QuestionIndex > 0 && (
                            <Button
                                className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
                                label="Previous"
                                type='button'
                                onClick={() => {
                                    setQuestionIndex(QuestionIndex - 1);
                                }}
                            />
                        )}
                        {QuestionIndex < questions.length - 1 && (
                            <Button
                                className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
                                label="Next"
                                type='button'
                                onClick={() => {
                                    setQuestionIndex(QuestionIndex + 1);
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalyseTestQuestion
