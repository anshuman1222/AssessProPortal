import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import SelectList from "../SelectList";
import Loading from "../Loader";
import Button from "../Button";
import { updateQuestion } from "../../redux/actions/question";
const EditQuestion = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const { loading, subjectList } = useSelector((state) => state.subject);
    const { editquestion } = useSelector((state) => state.question);
    const { token } = useSelector((state) => state.user);
    let defaultValues = { body: editquestion?.body, explanation: editquestion?.explanation, first: editquestion?.options[0], second: editquestion?.options[1], third: editquestion?.options[2], fourth: editquestion?.options[3], marks: editquestion?.marks, answer: editquestion?.answer };
    const [subject, setSubject] = useState(editquestion?.subject);
    const isLoading = false,
        isUpdating = false;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ defaultValues });

    useEffect(() => {
        setSubject(editquestion?.subject);
        reset(defaultValues);
    }, [editquestion])




    const handleOnSubmit = (data, e) => {
        e.preventDefault();
        const options = [data?.first, data?.second, data?.third, data?.fourth];
        dispatch(updateQuestion(token, editquestion?._id, data?.body, data?.explanation, options, subject, data?.marks, data?.answer));
    };

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
                    <Dialog.Title
                        as='h2'
                        className='text-base font-bold leading-6 text-gray-900 mb-4'
                    >
                        {editquestion ? "UPDATE QUESTION" : "ADD NEW QUESTION"}
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

                    {isLoading || isUpdating ? (
                        <div className='py-5'>
                            <Loading />
                        </div>
                    ) : (
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
                    )}
                </form>
            </ModalWrapper>
        </>
    );
};

export default EditQuestion;