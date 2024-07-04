import React from "react";
import { getInitials } from "../../utils";
import { useSelector } from "react-redux";
import ModalWrapper from "../../components/ModalWrapper";
const AdminInfo = ({ open, setOpen }) => {
    const { user } = useSelector((state) => state.admin);
    return user && (
        <ModalWrapper open={open} setOpen={setOpen}>
            <div className='flex items-center gap-4'>
                <div className='w-16 h-16 bg-blue-600 rounded-full text-white flex items-center justify-center text-2xl '>
                    <span className='text-center font-bold'>
                        {getInitials(user?.username)}
                    </span>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <p className='text-black text-xl font-bold'>{user?.username}</p>
                    <span className='text-base text-gray-500'>{user?.type}</span>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default AdminInfo;