import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import SelectList from "../SelectList";
import Button from "../Button";
import { addQuestion } from "../../redux/actions/question";
import { RiRobot3Fill } from "react-icons/ri";
import { getAiSuggestion } from "../../redux/actions/question";
import { toast } from "react-toastify";
import { GeneratedQuestionSuccess } from "../../redux/reducers/questionReducer";
const AddQuestion = ({ open, setOpen, userData }) => {
    const dispatch = useDispatch();
    const { subjectList } = useSelector((state) => state.subject);
    const { token } = useSelector((state) => state.user);
    const { generatedQuestion } = useSelector(state => state.question);
    let defaultValues = { body: generatedQuestion?.title, explanation: generatedQuestion?.explanation, first: generatedQuestion?.options[0], second: generatedQuestion?.options[1], third: generatedQuestion?.options[2], fourth: generatedQuestion?.options[3], marks: generatedQuestion?.marks, answer: generatedQuestion?.answer };
    const [subject, setSubject] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const getSubjectName = (subjectId) => {
        const foundSubject = subjectList?.find((subject) => subject.id === subjectId);
        if (foundSubject == undefined) return foundSubject;
        return foundSubject.subject;
    };

    const handleOnSubmit = (data, e) => {
        e.preventDefault();
        const options = [data?.first, data?.second, data?.third, data?.fourth];
        dispatch(addQuestion(token, data?.body, data?.explanation, options, subject, data?.marks, data?.answer));
        e.target.reset();
        dispatch(GeneratedQuestionSuccess(null));
        setSubject({
            ...subject,
            [subject]: [],
        });
    };
    const suggestionClick = () => {

        subject ? dispatch(getAiSuggestion(getSubjectName(subject))) : toast.info("Select Subject for Suggestion");

    };
    useEffect(() => {
        reset(defaultValues);
    }, [generatedQuestion])

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
                    <Dialog.Title
                        as='h2'
                        className='text-base font-bold leading-6 text-gray-900 mb-4'
                    >
                        {userData ? "UPDATE PROFILE" : "ADD NEW QUESTION"}
                    </Dialog.Title>
                    <div className='mt-2 flex flex-col gap-6'>
                        <SelectList
                            label='Select Subject'
                            lists={subjectList}
                            selected={subject}
                            setSelected={setSubject}
                        />
                        <Textbox
                            placeholder='Question Body'
                            type='text'
                            name='body'
                            label='Question Body'
                            className='w-full rounded'
                            register={register("body", {
                                required: "Question Body is required!",
                            })}
                            error={errors.body ? errors.body.message : ""}
                        />
                        <Textbox
                            placeholder='Question Explanation'
                            type='textarea'
                            name='explanation'
                            label='Question Explanation'
                            className='w-full rounded'
                            register={register("explanation")}
                            error={errors.explanation ? errors.explanation.message : ""}
                        />
                        <div className="flex gap-4" >
                            <Textbox
                                placeholder='Option A'
                                type='text'
                                name='first'
                                label='Option A'
                                className='w-full rounded'
                                register={register("first", {
                                    required: "Option A is required!",
                                })}
                                error={errors.first ? errors.first.message : ""}
                            />
                            <Textbox
                                placeholder='Option B'
                                type='text'
                                name='second'
                                label='Option B'
                                className='w-full rounded'
                                register={register("second", {
                                    required: "Option B is required!",
                                })}
                                error={errors.second ? errors.second.message : ""}
                            />
                        </div>
                        <div className="flex gap-4">
                            <Textbox
                                placeholder='Option C'
                                type='text'
                                name='third'
                                label='Option C'
                                className='w-full rounded'
                                register={register("third", {
                                    required: "Option C is required!",
                                })}
                                error={errors.third ? errors.third.message : ""}
                            />
                            <Textbox
                                placeholder='Option D'
                                type='text'
                                name='fourth'
                                label='Option D'
                                className='w-full rounded'
                                register={register("fourth", {
                                    required: "Option D is required!",
                                })}
                                error={errors.fourth ? errors.fourth.message : ""}
                            />
                        </div>

                        <div className="flex gap-4">
                            <Textbox
                                placeholder='Total Mark'
                                type='number'
                                name='marks'
                                label='Total Mark'
                                className='w-full rounded'
                                register={register("marks", {
                                    required: "Total Mark is required!",
                                })}
                                error={errors.marks ? errors.marks.message : ""}
                            />
                            <Textbox
                                placeholder='Correct Answer'
                                type='text'
                                name='answer'
                                label='Correct Answer'
                                className='w-full rounded'
                                register={register("answer", {
                                    required: "Correct Answer is required!",
                                })}
                                error={errors.answer ? errors.answer.message : ""}
                            />
                        </div>

                    </div>
                    <div className="flex justify-between">
                        <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                            <Button
                                type='button'
                                className='flex flex-row-reverse gap-1 items-center bg-white font-semibold text-gray-900 sm:w-auto rounded-md py-2 2xl:py-2.5'
                                label='AI'
                                icon={<RiRobot3Fill className='text-lg' />}
                                onClick={() => suggestionClick()}
                            />
                        </div>
                        <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                            <Button
                                type='submit'
                                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                                label='Submit'
                            />

                            <Button
                                type='button'
                                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                                onClick={() => setOpen(false)}
                                label='Cancel'
                            />
                        </div>
                    </div>
                </form>
            </ModalWrapper>
        </>
    );
};

export default AddQuestion;