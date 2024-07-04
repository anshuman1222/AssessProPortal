import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../../components/Textbox";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { adminlogin } from "../../redux/actions/admin";
const AdminLogin = () => {
    const { user , loading } = useSelector((state) => state.admin);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        user && navigate("/admin-dashboard");
    }, [user]);
    const submitHandler = async (data, e) => {
        e.preventDefault();
        dispatch(adminlogin(data?.username, data?.password));
    };
    return (
        <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
            <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
                <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
                    <form
                        onSubmit={handleSubmit(submitHandler)}
                        className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
                    >
                        <div className=''>
                            <p className='text-blue-600 text-3xl font-bold text-center'>
                                Welcome back!
                            </p>
                            <p className='text-center text-base text-gray-700 '>
                                Keep all your credential safe.
                            </p>
                        </div>
                        <div className='flex flex-col gap-y-5'>
                            <Textbox
                                placeholder='username'
                                type='text'
                                name='username'
                                label='Useraname'
                                className='w-full rounded-full'
                                register={register("username", {
                                    required: "Username is required!",
                                })}
                                error={errors.username ? errors.username.message : ""}
                            />
                            <Textbox
                                placeholder='your password'
                                type='password'
                                name='password'
                                label='Password'
                                className='w-full rounded-full'
                                register={register("password", {
                                    required: "Password is required!",
                                })}
                                error={errors.password ? errors.password.message : ""}
                            />
                            <Button
                                type='submit'
                                label={loading ? "Loading" : "Submit"}
                                className='w-full h-10 bg-blue-700 text-white rounded-full'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default AdminLogin
