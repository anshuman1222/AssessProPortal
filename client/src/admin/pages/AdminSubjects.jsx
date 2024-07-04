import React , {useEffect , useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loader";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import Title from '../../components/Title';
import SubjectTable from '../components/SubjectTable';
import { getAllSubjects } from "../../redux/actions/subject"
import AddSubject from '../components/AddSubject';
const AdminSubjects = () => {
const dispatch = useDispatch();
    const { loading, subjectList } = useSelector((state) => state.subject);
    const {token} = useSelector((state)=>state.admin);
    useEffect(() => {
         dispatch(getAllSubjects(token));
    },[]);
    const [open, setOpen] = useState(false);
    return loading ? (
        <div>
            <Loading />
        </div>
    ) : (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-4'>
                <Title title="Subjects" />
                    <Button
                        onClick={() => setOpen(true)}
                        label='Create Subject'
                        icon={<IoMdAdd className='text-lg' />}
                        className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
                    />
            </div>
            <div className='w-full'>
                {subjectList && <SubjectTable subjects={subjectList} />}
            </div>
            <AddSubject open={open} setOpen={setOpen} />
        </div>
    );
}

export default AdminSubjects


