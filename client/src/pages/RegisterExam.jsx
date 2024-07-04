import React, { useEffect } from 'react'
import Loading from "../components/Loader";
import Title from '../components/Title';
import RegisterTable from "../components/Exam/RegisterTable";
import { useSelector, useDispatch } from "react-redux";
import { getAllRegisterTest } from "../redux/actions/test"
const RegisterExam = () => {
    const dispatch = useDispatch();
    const { loading, registerExamList } = useSelector((state) => state.test);
    const { token } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getAllRegisterTest(token));
    }, []);
    return loading ? (
        <div>
            <Loading />
        </div>
    ) : (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-4'>
                <Title title={"Register Exam"} />
            </div>

            <div className='w-full'>
                {registerExamList && <RegisterTable tests={registerExamList}/>}
            </div>
        </div>
    );
}

export default RegisterExam
