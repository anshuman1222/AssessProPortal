import React , {useState} from 'react'
import ModalWrapper from "../../components/ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../../components/Textbox";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import { addSubject } from '../../redux/actions/subject';
import { useSelector, useDispatch } from "react-redux";
const AddSubject = ({open,setOpen}) => {
    const dispatch = useDispatch();
    const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm();
    const { token } = useSelector((state) => state.admin);
    const submitHandler = (data ,e) => {
        e.preventDefault();
        dispatch(addSubject(token, data?.name))
        setOpen(false);
     };
  return (
    <>
            <ModalWrapper open={open} setOpen={setOpen}>
                 <form onSubmit={handleSubmit(submitHandler)}>
                     <Dialog.Title
                        as='h2'
                        className='text-base font-bold leading-6 text-gray-900 mb-4'
                    >
                    ADD SUBJECT
                    </Dialog.Title>

                    <div className='mt-2 flex flex-col gap-6'>
                        <Textbox
                            placeholder='Subject Name'
                            type='text'
                            name='name'
                            label='Subject Name'
                            className='w-full rounded'
                            register={register("name", { required: "Name is required" })}
                            error={errors.name ? errors.name.message : ""}
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

export default AddSubject
