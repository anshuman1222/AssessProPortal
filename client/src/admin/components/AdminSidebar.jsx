import React from 'react'
import {
    MdDashboard,
    MdOutlineAddTask,
} from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { MdSubject } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../../redux/reducers/userReducer";
import clsx from "clsx";
const linkData = [
    {
        label: "Dashboard",
        link: "admin-dashboard",
        icon: <MdDashboard />,
    },
    {
        label: "Teachers",
        link: "admin-teachers",
        icon: <GiTeacher />,
    },
    {
        label: "Subjects",
        link: "admin-subjects",
        icon: <MdSubject />,
    },
    {
        label: "Students",
        link: "admin-students",
        icon: <PiStudent />,
    },
];

const AdminSidebar = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const sidebarLinks = user?.role === "admin" ? linkData : linkData.slice(0, 5);
    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    };
    const NavLink = ({ el }) => {
        return (
            <Link
                to={el.link}
                onClick={closeSidebar}
                className={clsx(
                    "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
                    path === el.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : ""
                )}
            >
                {el.icon}
                <span className='hover:text-[#2564ed]'>{el.label}</span>
            </Link>
        );
    };
    return (
        <div className='w-full  h-full flex flex-col gap-6 p-5'>
            <h1 className='flex gap-1 items-center'>
                <p className='bg-blue-600 p-2 rounded-full'>
                    <MdOutlineAddTask className='text-white text-2xl font-black' />
                </p>
                <span className='text-2xl font-bold text-black'>AssessPro</span>
            </h1>

            <div className='flex-1 flex flex-col gap-y-5 py-8'>
                {sidebarLinks.map((link) => (
                    <NavLink el={link} key={link.label} />
                ))}
            </div>
        </div>
    )
}

export default AdminSidebar
