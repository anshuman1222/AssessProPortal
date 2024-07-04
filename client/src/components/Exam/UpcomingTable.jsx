import React from "react";
import Button from "../Button";
import { useNavigate } from 'react-router-dom';
const UpcomingTable = ({ tests }) => {
    const navigate = useNavigate();
    const TableRow = ({ test }) => (
        <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
            <td className='py-2'>
                <p className='w-full line-clamp-2 text-base text-black'>
                    {test?.title}
                </p>
            </td>
            <td className='py-2'>
                <p className='w-full line-clamp-2 text-base text-black'>
                    {test?.duration/60} Minutes
                </p>
            </td>
            <td className='py-2 flex gap-2 md:gap-4 justify-end'>
            <Button
                className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base '
                label='Take Test'
                type='button'
            onClick={() => navigate(`/write-exam/${test?._id}`)}
            />
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
                                <th className='py-2'>Exam Title</th>
                                <th className="py-2">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests.map((test, index) => (
                                <TableRow key={index} test={test} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default UpcomingTable
