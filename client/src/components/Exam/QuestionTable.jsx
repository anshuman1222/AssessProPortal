import React, { useState } from "react";
import Button from "../Button";
import { blockQuestion, unblockQuestion } from "../../redux/actions/question";
import { useSelector, useDispatch } from "react-redux";
import EditQuestion from './EditQuestion';
import { EditQuestionSuccess } from "../../redux/reducers/questionReducer";
const QuestionTable = ({ questions }) => {
    const [open, setOpen] = useState(false);
    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const info = (q) => {
        dispatch(EditQuestionSuccess(q));
        setOpen(true);
    };
    const blocksClicks = (id) => {
        dispatch(blockQuestion(token, id))
    };
    const unblockClicks = (id) => {
        dispatch(unblockQuestion(token, id))
    }
    const TableRow = ({ question }) => (
        <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
            <td className='py-2'>
                <p className='w-full line-clamp-2 text-base text-black'>
                    {question?.body}
                </p>
            </td>
            <td className='py-2'>
                <p className='w-full line-clamp-2 text-base text-black'>
                    {question?.status ? "Active" : "Inactive"}
                </p>
            </td>
            <td className='py-2 flex gap-2 md:gap-4 justify-end'>
                <Button
                    className='text-green-700 hover:text-green-500 sm:px-0 text-sm md:text-base'
                    label="Edit"
                    type='button'
                    onClick={() => info(question)}
                />
                {question?.status ? <Button
                    className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base'
                    label='Block Question'
                    type='button'
                    onClick={() => blocksClicks(question?._id)}
                /> : <Button
                    className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base'
                    label='Unblock Question'
                    type='button'
                    onClick={() => unblockClicks(question?._id)}
                />}
            </td>
        </tr>
    );
    return (
        <>
            <div className='bg-white  px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
                <div className='overflow-x-auto'>
                    <table className='w-full '>
                        <thead className='w-full border-b border-gray-300'>
                            <tr className='w-full text-black  text-left'>
                                <th className='py-2'>Question Title</th>
                                <th className="py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((question, index) => (
                                <TableRow key={index} question={question} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <EditQuestion open={open} setOpen={setOpen} />
        </>
    )
}

export default QuestionTable
