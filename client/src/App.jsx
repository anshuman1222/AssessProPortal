import React, { useState } from 'react'
import Login from "./pages/Login"
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RegisterExam from "./pages/RegisterExam";
import UpcomingExam from './pages/UpcomingExam';
import WriteExam from './pages/WriteExam';
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminLogin from './admin/pages/AdminLogin';
import Results from "./pages/Results";
import AnalysisPage from "./pages/AnalysisPage";
import Error from './pages/Error';
import Exams from "./pages/Exams";
import ExamDetails from "./pages/ExamDetails";
import AddExam from "./components/Exam/AddExam";
import RankListTable from './components/Exam/RankListTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector , useDispatch} from "react-redux";
import Sidebar from "./components/Sidebar";
import AdminSidebar from './admin/components/AdminSidebar';
import AdminNavbar from './admin/components/AdminNavbar';
import Navbar from "./components/Navbar";
import { Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { setOpenSidebar } from "./redux/reducers/userReducer";
import { adminsetOpenSidebar } from "./redux/reducers/adminReducer";
import clsx from "clsx";
import AdminTeachers from './admin/pages/AdminTeachers';
import AdminSubjects from './admin/pages/AdminSubjects';
import AdminStudents from './admin/pages/AdminStudents';
import Questions from './pages/Questions';

function Layout() {
  const { user } = useSelector((state) => state.user);

  const location = useLocation();

  

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className='flex-1 overflow-y-auto'>
        <Navbar />

        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/log-in' state={{ from: location }} replace />
  );
}

function AdminLayout() {
  const { user } = useSelector((state) => state.admin);

  const location = useLocation();



  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <AdminSidebar />
      </div>

      <AdminMobileSidebar />

      <div className='flex-1 overflow-y-auto'>
        <AdminNavbar />

        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/admin-log-in' state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.user);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className='bg-white w-3/4 h-full'>
              <div className='w-full flex justify-end px-5 p-5'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end'
                >
                  <IoClose size={35} />
                </button>
              </div>

              <div className='-mt-10'>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

const AdminMobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.admin);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(adminsetOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className='bg-white w-3/4 h-full'>
              <div className='w-full flex justify-end px-5 p-5'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end'
                >
                  <IoClose size={35} />
                </button>
              </div>

              <div className='-mt-10'>
                <AdminSidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};


function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6] '>
      <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={user?.type === "TEACHER" ? <Navigate to='/dashboard' /> : <Navigate to='/register-exam' />} />
          <Route path='/dashboard' element={user?.type === "TEACHER" ? <Dashboard /> : <Navigate to='/' />} />
          <Route path='/exams' element={user?.type === "TEACHER" ? <Exams /> : <Navigate to='/' />} />
          <Route path='/exams/add' element={user?.type === "TEACHER" ? <AddExam /> : <Navigate to='/' />} />
          <Route path='/questions' element={user?.type==="TEACHER" ? <Questions /> : <Navigate to='/'/>} />
          <Route path='/results' element={user?.type === "STUDENT" ? <Results /> : <Navigate to='/' />} />
          <Route path='/exam/:id' element={user?.type === "TEACHER" ? <ExamDetails /> : <Navigate to='/' />} />
          <Route path='/ranklist/:id' element={<RankListTable />} />
          <Route path='/register-exam' element={user?.type === "STUDENT" ? <RegisterExam /> : <Navigate to='/' />} />
          <Route path='/upcoming-exams' element={user?.type === "STUDENT" ? <UpcomingExam /> : <Navigate to='/' />} />
          <Route path='/write-exam/:id' element={user?.type === "STUDENT" ? <WriteExam /> : <Navigate to='/' />} />
          <Route path='/test-result/:id' element={user?.type === "STUDENT" ? <AnalysisPage /> : <Navigate to='/' />} />
          <Route path='/test-result/:id/:userid' element={<AnalysisPage />} />
        </Route>
        <Route element={<AdminLayout/>}>
          <Route index path='/' element={<Navigate to='/admin-dashboard' />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/admin-teachers' element={<AdminTeachers />} />
          <Route path='/admin-subjects' element={<AdminSubjects />} />
          <Route path='/admin-students' element={<AdminStudents />} />
        </Route>
        <Route path='/log-in' element={<Login />} />
        <Route path='/admin-log-in' element={<AdminLogin />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer />
    </main>
  )
}

export default App
