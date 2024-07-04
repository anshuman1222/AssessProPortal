import React, { useEffect } from 'react'
import Loading from "../components/Loader";
import Title from '../components/Title';
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Table from "../components/Exam/Table";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks } from "../redux/actions/task"
const Exams = () => {
    const dispatch = useDispatch();
    const { loading , taskList } = useSelector((state) => state.task);
    const {token} = useSelector((state)=>state.user);
    const navigate=useNavigate();
    useEffect(() => {
        dispatch(getAllTasks(token));
    }, []);
    return loading ? (
        <div>
            <Loading />
        </div>
    ) : (
            <div className='w-full'>
                <div className='flex items-center justify-between mb-4'>
                    <Title title={"Exams"} />
                        <Button
                            onClick={() => navigate('/exams/add') }
                            label='Create Exam'
                            icon={<IoMdAdd className='text-lg' />}
                            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
                        />
                </div>
                <div className='w-full'>
                    {taskList!=null && <Table tasks={taskList} />}
                </div>
        </div>
    );
}

export default Exams
