import React from 'react'
import { MdCheck } from "react-icons/md";
import Button from '../components/Button';
const Instructions = ({ examData, setView , startTest }) => {
  return (
    <div>
          <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 w-full ">
              <div className="max-w-3xl mx-auto ">
                  <div className="bg-muted rounded-lg p-6 md:p-8 bg-[#ffffff]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <h2 className="text-xl font-semibold mb-2">Test Duration</h2>
                              <p className="text-muted-foreground">The test will be {examData?.duration/60} minutes long.</p>
                          </div>
                          <div>
                              <h2 className="text-xl font-semibold mb-2">Number of Questions</h2>
                              <p className="text-muted-foreground">There will be {examData?.questions.length} multiple-choice questions.</p>
                          </div>
                      </div>
                      <div className='my-6'>
                          <h2 className="text-xl font-semibold mb-2 ">General Instructions</h2>
                          <ul className="space-y-2 text-muted-foreground">
                              <li>
                                  <MdCheck className="mr-2 inline-block h-4 w-4" />
                                  Read each question carefully before answering.
                              </li>
                              <li>
                                  <MdCheck className="mr-2 inline-block h-4 w-4" />
                                  Choose the best answer from the options provided.
                              </li>
                              <li>
                                  <MdCheck className="mr-2 inline-block h-4 w-4" />
                                  Do not leave any question unanswered.
                              </li>
                              <li>
                                  <MdCheck className="mr-2 inline-block h-4 w-4" />
                                  Once you submit the test, you cannot go back and change your answers.
                              </li>
                          </ul>
                      </div>
                      <div>
                          <h2 className="text-xl font-semibold mb-2">Test Rules</h2>
                          <ul className="space-y-2 text-muted-foreground">
                              <li>
                                  <MdCheck className="mr-2 inline-block h-4 w-4" />
                                  No electronic devices, including phones, are allowed during the test.
                              </li>
                              <li>
                                  <MdCheck className="mr-2 inline-block h-4 w-4" />
                                  Cheating or any form of academic dishonesty will result in immediate disqualification.
                              </li>
                              <li>
                                  <MdCheck className="mr-2 inline-block h-4 w-4" />
                                  You must remain in the testing room for the entire duration of the test.
                              </li>
                          </ul>
                      </div>
                      <div className="mt-6 flex justify-end">
                          <Button
                              onClick={() => {
                                  startTest();
                                  setView("questions");
                              }}
                              label='Start Test'
                              className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
                          />
                      </div>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Instructions
