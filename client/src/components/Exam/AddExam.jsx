import React, { useState } from "react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import QuestionList from "./QuestionList";
import Button from "../Button";
import { useSelector, useDispatch } from "react-redux";
import { createTask } from "../../redux/actions/task";
const AddExam = () => {
    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [paper, setPaper] = useState([]);
    const submitHandler = (data, e) => {
        e.preventDefault();
        dispatch(createTask(data?.title, data?.duration, paper, token));
    };
    return (
        <>

            <form onSubmit={handleSubmit(submitHandler)}>

                <div className='mt-2 flex flex-col gap-6'>
                    <div className="flex gap-4">
                        <Textbox
                            placeholder='Exam Title'
                            type='text'
                            name='title'
                            label='Exam Title'
                            className='w-full rounded bg-white'
                            register={register("title", { required: "Title is required" })}
                            error={errors.title ? errors.title.message : ""}
                        />
                        <Textbox
                            placeholder='Exam Duration In Minutes'
                            type='number'
                            name='duration'
                            label='Exam Duration'
                            className='w-full rounded bg-white'
                            register={register("duration", { required: "Duration is required" })}
                            error={errors.duration ? errors.duration.message : ""}
                        />
                    </div>

                    <QuestionList setPaper={setPaper} paper={paper} />


                    <div className='bg-gray-50 py-6 px-6 sm:flex sm:flex-row-reverse gap-4'>
                        <Button
                            label='Submit'
                            type='submit'
                            className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                        />
                    </div>
                </div>
            </form >
        </>
    );
};

export default AddExam;