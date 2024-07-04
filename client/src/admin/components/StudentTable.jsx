import React from "react";
import Button from "../../components/Button";
import { blockStudent, unblockStudent } from "../../redux/actions/student";
import { useSelector, useDispatch } from "react-redux";


const StudentTable = ({ students }) => {
    const { token } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const blocksClicks = (id) => {
        dispatch(blockStudent(token, id))
    };
    const unblockClicks = (id) => {
        dispatch(unblockStudent(token, id))
    }
    const TableRow = ({ student }) => (
        <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10 '>
            <td className='py-2'>
                <div className='flex items-center gap-2'>
                    <p className='w-full line-clamp-2 text-base text-black'>
                        {student?.name}
                    </p>
                </div>
            </td>
            <td className='py-2'>
                <div className='flex items-center gap-2'>
                    <p className='w-full line-clamp-2 text-base text-black'>
                        {student?.status ? "Active" : "Inactive"}
                    </p>
                </div>
            </td>
            <td className='py-2 flex gap-2 md:gap-4 justify-end'>
                {student?.status ? <Button
                    className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base'
                    label='Block Student'
                    type='button'
                    onClick={() => blocksClicks(student?.id)}
                /> : <Button
                    className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base'
                    label='Unblock Student'
                    type='button'
                    onClick={() => unblockClicks(student?.id)}
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
                                <th className='py-2'>Student Name</th>
                                <th className='py-2'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <TableRow key={index} student={student} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default StudentTable
