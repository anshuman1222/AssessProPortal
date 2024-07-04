import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getRankListByTestId } from '../../redux/actions/task';
import Loading from "../../components/Loader";
import Title from '../../components/Title';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
const RankListTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.user);
    const params = useParams();
    const id = params?.id || "";
    const { loading, ranklist } = useSelector((state) => state.task);
    useEffect(() => {
        dispatch(getRankListByTestId(token, id));
    }, []);
    const TableRow = ({ list }) => (
        <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
            <td className='py-2'>
                <p className='w-full line-clamp-2 text-base text-black'>
                    {list?.username}
                </p>
            </td>
            <td className='py-2'>
                <p className='w-full line-clamp-2 text-base text-black'>
                    {list?.score} Marks
                </p>
            </td>
            <td className='py-2 flex gap-2 md:gap-4 justify-end'>
                <Button
                    className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base'
                    label="Analysis"
                    type='button'
                    onClick={() => navigate(`/test-result/${id}/${list?.userid}`)}
                />
            </td>
        </tr>
    );
    return loading ? (
        <div>
            <Loading />
        </div>
    ) : (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-4'>
                <Title title={"RankList"} />
            </div>

            <div className='w-full'>
                <div className='bg-white  px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
                    <div className='overflow-x-auto'>
                        <table className='w-full '>
                            <thead className='w-full border-b border-gray-300'>
                                <tr className='w-full text-black  text-left'>
                                    <th className='py-2'>Student Name</th>
                                    <th className="py-2">Student Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ranklist?.map((list, index) => (
                                        <TableRow key={index} list={list} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default RankListTable

