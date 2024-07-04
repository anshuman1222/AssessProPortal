import React, { useState, useEffect } from 'react'
import Loading from "../components/Loader";
import Title from '../components/Title';
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import QuestionTable from "../components/Exam/QuestionTable";
import AddQuestion from "../components/Exam/AddQuestion";
import { useSelector, useDispatch } from "react-redux";
import { getAllQuestions } from "../redux/actions/question"
import { getAllActiveSubjects } from '../redux/actions/subject';
const Questions = () => {
  const dispatch = useDispatch();
  const { loading, questionList } = useSelector((state) => state.question);
  const { token } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(getAllActiveSubjects(token));
    dispatch(getAllQuestions(token));
  }, []);
  return loading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={"Questions"} />
        
          <Button
            onClick={() => setOpen(true)}
            label='Create Question'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
      </div>

      <div className='w-full'>
        {questionList && <QuestionTable questions={questionList} />}
      </div>
      <AddQuestion open={open} setOpen={setOpen}/>
    </div>
  );
}

export default Questions
