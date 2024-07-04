import React, { useState } from "react";
import { formatDate } from "../../utils";
import Button from "../Button";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Table = () => {
    const navigate = useNavigate();
    const { loading, taskList } = useSelector((state) => state.task);

    const TableRow=({task})=>(
        <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
            <td className='py-2'>
                    <p className='w-full line-clamp-2 text-base text-black'>
                        {task?.title}
                    </p>
            </td>
            <td className='py-2'>
                <p className='w-full line-clamp-2 text-base text-black'>
                    {task?.total} Questions
                </p>
            </td>
            <td className='py-2'>
                <p className='w-full line-clamp-2 text-base text-black'>
                    {task?.duration/60} Minutes
                </p>
            </td>
            <td className='py-2'>
                <span className='text-sm text-gray-600'>
                    {formatDate(new Date(task?.date))}
                </span>
            </td>
            <td className='py-2 flex gap-2 md:gap-4 justify-end'>
                <Button
                    className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base'
                    label="Open"
                    type='button'
                    onClick={() => navigate(`/exam/${task?._id}`)}
                />
                <Button
                    className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base'
                    label="RankList"
                    type='button'
                    onClick={() => navigate(`/ranklist/${task?._id}`)}
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
                              <th className="py-2">Questions</th>
                              <th className="py-2">Duration</th>
                              <th className='py-2'>Created At</th>
                          </tr>
                      </thead>
                      <tbody>
                          {taskList?.map((task, index) => (
                              <TableRow key={index} task={task} />
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
    </>
  )
}

export default Table
