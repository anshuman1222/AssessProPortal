import React, { useEffect } from "react";
import { ImCheckmark2 } from "react-icons/im";
import { ImCross } from "react-icons/im";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { getTeacherDashboardCount } from "../redux/actions/user";
import Loading from "../components/Loader";
import Title from '../components/Title';
const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, dashboardDetails, token } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getTeacherDashboardCount(token));
  }, []);
  const stats = [
    {
      _id: "1",
      label: "ACTIVE TESTS",
      total: dashboardDetails?.activeTests || 0,
      icon: <ImCheckmark2 />,
      bg: "bg-[#34C759]",
    },
    {
      _id: "2",
      label: "ACTIVE STUDENTS",
      total: dashboardDetails?.activeStudents || 0,
      icon: <ImCheckmark2 />,
      bg: "bg-[#34C759]",
    },
    {
      _id: "3",
      label: "ACTIVE QUESTIONS",
      total: dashboardDetails?.activeQuestions || 0,
      icon: <ImCheckmark2 />,
      bg: "bg-[#34C759]",
    },
    {
      _id: "4",
      label: "INACTIVE QUESTIONS",
      total: dashboardDetails?.blockedQuestions || 0,
      icon: <ImCross />,
      bg: "bg-[#be185d]",
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{count}</span>
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };
  return loading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div className='h-full py-4'>
        <div className='flex items-center justify-between mb-4'>
          <Title title={"Dashboard"} />
        </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        { dashboardDetails && stats?.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;