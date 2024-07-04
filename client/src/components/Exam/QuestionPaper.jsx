import React from 'react'
import Button from "../Button";
import Title from '../Title';
import { MdCheck } from "react-icons/md";
import { saveTest } from '../../redux/actions/answersheet';
import { endTest } from '../../redux/actions/answersheet';
import { useSelector, useDispatch } from 'react-redux'
const QuestionPaper = ({task,questions,secondsLeft,selectedQuestionIndex,setSelectedQuestionIndex,selectedOptions,setSelectedOptions,intervalId,setTimeUp,setView}) => {
    const { token } = useSelector((state) => state.user);
    const { answersheet , saveloading } = useSelector((state) => state.answersheet);
    const dispatch = useDispatch();
    const saveClick = () => {
        dispatch(saveTest(token, answersheet?._id , selectedOptions));
    };
    const endClick = () => {
        dispatch(endTest(token, answersheet?._id, selectedOptions));
    };
  return (
      <div className="flex flex-col gap-2">
          <div className='flex items-center justify-between mb-4'>
              <Title title={task?.title} />

              <div className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5 px-3 py-2 outline-none">
                  <span className="text-2xl">{secondsLeft}</span>
              </div>
          </div>



          <div className="flex  items-center justify-center ">
              <div className="bg-[#ffffff] p-8 rounded-lg w-full">
                  <h2 className="font-bold mb-4 flex items-center justify-between">
                  <div className='text-2xl'>
                      {selectedQuestionIndex + 1} :{" "}
                      {questions[selectedQuestionIndex]?.body}
                      </div>
                      <Button
                          className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
                          label={saveloading ? "Saving" : "Save"}
                          type='button'
                          onClick={() => saveClick()}
                      />
                  </h2>
                  <div className="space-y-4">
                      {questions[selectedQuestionIndex].options.map((option, index) => {
                          return (
                              <div
                                  className={`px-4 py-3 rounded-md cursor-pointer transition-colors duration-300 ${selectedOptions[selectedQuestionIndex] === option
                                      ?
                                      " border-solid border-2 border-blue-600 text-primary-foreground scale-101 "
                                      : "hover:bg-slate-200"
                                      }`}
                                  key={index}
                                  onClick={() => {
                                      setSelectedOptions({
                                          ...selectedOptions,
                                          [selectedQuestionIndex]: option,
                                      });
                                  }}
                              >
                                  <div className="flex items-center justify-between">
                                      <span>
                                          {option}
                                      </span>
                                      {selectedOptions[selectedQuestionIndex] === option && <MdCheck className="w-5 h-5 text-primary-foreground" />}
                                  </div>
                              </div>
                          )
                      })}
                  </div>
                  <div className="flex justify-between mt-6">
                      {selectedQuestionIndex > 0 && (
                          <Button
                              className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
                              label="Previous"
                              type='button'
                              onClick={() => {
                                  setSelectedQuestionIndex(selectedQuestionIndex - 1);
                              }}
                          />
                      )}
                      {selectedQuestionIndex < questions.length - 1 && (
                          <Button
                              className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
                              label="Next"
                              type='button'
                              onClick={() => {
                                  setSelectedQuestionIndex(selectedQuestionIndex + 1);
                              }}
                          />
                      )}
                      {selectedQuestionIndex === questions.length - 1 && (
                          <Button
                              className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
                              label="Submit"
                              type='button'
                              onClick={() => {
                                  endClick();
                                  clearInterval(intervalId);
                                  setTimeUp(true);
                                  setView("review");
                              }}
                          />
                      )}
                  </div>
              </div>
          </div>
      </div>
  )
}

export default QuestionPaper
