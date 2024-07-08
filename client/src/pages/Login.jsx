import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/user";
import { registerStudent } from '../redux/actions/user';
import { GrUserAdmin } from "react-icons/gr";
const Login = () => {
    const [values, setValues] = useState({state:true});
    const toggleMember = () => {
        setValues({ ...values, state: !values.state });
    };
    const { user, loading } = useSelector((state) => state.user);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    useEffect(() => {
        user && user?.type === "TEACHER" && navigate("/dashboard");
        user && user?.type === "STUDENT" && navigate("/register-exam");
    }, [user]);
    const dispatch = useDispatch();
    const submitHandler = async (data, e) => {
        e.preventDefault();
        values?.state ? dispatch(login(data?.email, data?.password)) : dispatch(registerStudent(data?.username, data?.email, data?.password)) ;
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
                                {values.state ? 'Welcome back!' : 'Get started with!'}
                            </p>
                            <p className='text-center text-base text-gray-700'>
                                {values.state ? 'Not a registered student yet?' : 'Already a registered student?'}
                                <button type='button' className='bg-white font-semibold text-gray-900  px-1 py-2 outline-none' onClick={toggleMember}>
                                    {values.state ? 'Register' : 'Login'}
                                </button>
                            </p>
                        </div>
                        <div className='flex flex-col gap-y-5'>
                            {!values.state && (
                                <Textbox
                                    placeholder='Student UserName'
                                    type='text'
                                    name='username'
                                    label='Student UserName'
                                    className='w-full rounded-full'
                                    register={register("username", { required: "UserName is required" })}
                                    error={errors.username ? errors.username.message : ""}
                                />
                            )}
                            <Textbox
                                placeholder='email@example.com'
                                type='email'
                                name='email'
                                label='Email Address'
                                className='w-full rounded-full'
                                register={register("email", {
                                    required: "Email Address is required!",
                                })}
                                error={errors.email ? errors.email.message : ""}
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
                            <Button
                                type='button'
                                label="Admin Login"
                                className='flex flex-row-reverse items-center bg-white font-semibold text-gray-900 '
                                onClick={() => navigate('/admin-log-in')}
                                icon={<GrUserAdmin className='text-lg' />}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login
