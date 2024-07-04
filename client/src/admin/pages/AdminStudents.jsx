import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loader";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import Title from '../../components/Title';
import StudentTable from '../components/StudentTable';
import { getAllStudents } from "../../redux/actions/student"
import AddStudent from '../components/AddStudent';
const AdminStudents = () => {
    const dispatch = useDispatch();
    const { loading, studentList } = useSelector((state) => state.student);
    const { token } = useSelector((state) => state.admin);
    useEffect(() => {
        dispatch(getAllStudents(token));
    }, []);
    const [open, setOpen] = useState(false);
    return loading ? (
        <div>
            <Loading />
        </div>
    ) : (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-4'>
                <Title title="Students" />
                <Button
                    onClick={() => setOpen(true)}
                    label='Add Student'
                    icon={<IoMdAdd className='text-lg' />}
                    className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
                />
            </div>
            <div className='w-full'>
                {studentList && <StudentTable students={studentList} />}
            </div>
            <AddStudent open={open} setOpen={setOpen} />
        </div>
    );
}

export default AdminStudents


