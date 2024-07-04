import React from 'react'
import {
    MdDashboard,
    MdOutlineAddTask,
    MdOutlineDensityMedium ,
    MdTaskAlt,
} from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/reducers/userReducer";
import clsx from "clsx";
const linkData = [
    {
        label: "Dashboard",
        link: "dashboard",
        icon: <MdDashboard />,
    },
    {
        label: "Exams",
        link: "exams",
        icon: <MdTaskAlt />,
    },
    {
        label: "Questions",
        link: "questions",
        icon: <FaTasks />,
    },
    {
        label: "Register Exam",
        link: "register-exam",
        icon: <MdTaskAlt />,
    },
    {
        label: "Upcoming Exams",
        link: "upcoming-exams",
        icon: <AiOutlineSchedule />,
    },
    {
        label: "Results",
        link: "results",
        icon: <MdOutlineDensityMedium />,
    },
];

const Sidebar = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const sidebarLinks = user?.type==="TEACHER" ? linkData.slice(0,3) : linkData.slice(3, 6);
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

export default Sidebar
