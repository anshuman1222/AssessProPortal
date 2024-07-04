import React, { useEffect } from 'react'
import Loading from "../components/Loader";
import Title from '../components/Title';
import ResultsTable from "../components/ResultsTable";
import { useSelector, useDispatch } from "react-redux";
import { getCompletedTests } from '../redux/actions/result';
const Results = () => {
    const dispatch = useDispatch();
    const { loading, testResults } = useSelector((state) => state.result);
    const { token } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getCompletedTests(token));
    }, []);
    return loading ? (
        <div>
            <Loading />
        </div>
    ) : (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-4'>
                <Title title={"Completed Exams Results"} />
            </div>

            <div className='w-full'>
                {testResults && <ResultsTable results={testResults} />}
            </div>
        </div>
    );
}

export default Results
