import React, {useEffect } from 'react'
import Loading from "../components/Loader";
import Title from '../components/Title';
import UpcomingTable from "../components/Exam/UpcomingTable";
import { useSelector, useDispatch } from "react-redux";
import { getAllUpcomingTest } from "../redux/actions/test"
const UpcomingExam = () => {
    const dispatch = useDispatch();
    const { loading, upcomingExamList } = useSelector((state) => state.test);
    const { token } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getAllUpcomingTest(token));
    }, []);
    return loading ? (
        <div>
            <Loading />
        </div>
    ) : (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-4'>
                <Title title={"Upcoming Exams"} />
            </div>

            <div className='w-full'>
                {upcomingExamList && <UpcomingTable tests={upcomingExamList}/>}
            </div>
        </div>
    );
}

export default UpcomingExam
