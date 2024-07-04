import React, { useState } from 'react'
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { changePassword } from '../redux/actions/user';
import { useSelector, useDispatch } from "react-redux";
const ChangePassword = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { token , user } = useSelector((state) => state.user);
    const submitHandler = (data , e) => {
        e.preventDefault();
        dispatch(changePassword(token,user?._id, data?.password))
    };
    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <Dialog.Title
                        as='h2'
                        className='text-base font-bold leading-6 text-gray-900 mb-4'
                    >
                        Change Password
                    </Dialog.Title>

                    <div className='mt-2 flex flex-col gap-6'>
                        <Textbox
                            placeholder='Enter New Password'
                            type='password'
                            name='password'
                            label='New Password'
                            className='w-full rounded'
                            register={register("password", { required: "New Password is required" })}
                            error={errors.password ? errors.password.message : ""}
                        />
                        <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>

                            <Button
                                label='Submit'
                                type='submit'
                                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
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
    )
}

export default ChangePassword
