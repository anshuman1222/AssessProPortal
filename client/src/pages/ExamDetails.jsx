import React , {useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTestById } from '../redux/actions/task';
import Loading from "../components/Loader";
import Title from '../components/Title';
import TestQuestion from "../components/TestQuestion"
const ExamDetails = () => {
  const params = useParams();
  const id = params?.id || "";
  const { token } = useSelector((state) => state.user);
  const {taskLoading , task} = useSelector((state)=>state.task);
  const {questionsLoading , questions} = useSelector((state)=>state.question);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTestById(token,id));
  }, []);
  return taskLoading || questionsLoading ? (
    <div>
      <Loading />
    </div>
  ) : (
      <div className='w-full'>
        <div className='flex items-center justify-between mb-4'>
          <Title title={task?.title} />
        </div>
        <main className="flex-1 py-8 px-6 md:px-12 lg:px-16">
          <div className="space-y-6">
            {questions?.map((question, index) => (
              <TestQuestion key={index} question={question} />
            ))}
          </div>
        </main>
      </div>
  )
}

export default ExamDetails
