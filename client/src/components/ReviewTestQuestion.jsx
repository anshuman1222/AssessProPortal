import React , {useState} from 'react'
import Button from "./Button";
import Title from './Title';
import { MdCheck } from "react-icons/md";
const ReviewTestQuestion = ({ questions, selectedOptions, setView }) => {
    const [QuestionIndex, setQuestionIndex] = useState(0);
    return (
        <div className="flex flex-col gap-2">
            <div className='flex items-center justify-between mb-4'>
                <Title title={"Review"} />
            </div>
            <div className="flex  items-center justify-center ">
                <div className="bg-[#ffffff] p-8 rounded-lg w-full">
                    <h2 className="font-bold mb-4 flex items-center justify-between">
                        <div className='text-2xl'>
                            {QuestionIndex + 1} :{" "}
                            {questions[QuestionIndex]?.body}
                        </div>
                    </h2>
                    <div className="space-y-4">
                        {questions[QuestionIndex].options.map((option, index) => {
                            return (
                                <div
                                    className={`px-4 py-3 rounded-md cursor-pointer transition-colors duration-300 ${selectedOptions[QuestionIndex] === option
                                        ?
                                        " border-solid border-2 border-blue-600 text-primary-foreground scale-101 "
                                        : "hover:bg-slate-200"
                                        }`}
                                    key={index}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>
                                            {option}
                                        </span>
                                        {selectedOptions[QuestionIndex] === option && <MdCheck className="w-5 h-5 text-primary-foreground" />}
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
                                   setQuestionIndex(QuestionIndex-1);
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
                        {QuestionIndex === questions.length - 1 && (
                            <Button
                                className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
                                label="Submit"
                                type='button'
                                onClick={() => {
                                    setView("result");
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewTestQuestion
