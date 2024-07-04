import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loader";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import Title from '../../components/Title';
import TeacherTable from '../components/TeacherTable';
import { getAllTeachers } from "../../redux/actions/teacher"
import AddTeacher from '../components/AddTeacher';
const AdminTeachers = () => {
    const dispatch = useDispatch();
    const { loading, teacherList } = useSelector((state) => state.teacher);
    const { token } = useSelector((state) => state.admin);
    useEffect(() => {
        dispatch(getAllTeachers(token));
    }, []);
    const [open, setOpen] = useState(false);
    return loading ? (
        <div>
            <Loading />
        </div>
    ) : (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-4'>
                <Title title="Teachers" />
                <Button
                    onClick={() => setOpen(true)}
                    label='Add Teacher'
                    icon={<IoMdAdd className='text-lg' />}
                    className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
                />
            </div>
            <div className='w-full'>
                {teacherList && <TeacherTable teachers={teacherList} />}
            </div>
            <AddTeacher open={open} setOpen={setOpen} />
        </div>
    );
}

export default AdminTeachers


