
'use client'

import React from 'react';
import Link from 'next/link';
import Sidebar from '../../components/siderbar/Sidebar';
import DashboardNavbar from '../../components/dashboardnavbar/Dashboardnavbar';
import DashboardExperience from '../../components/dashboardexperience/DashboardExperience';
import DashboardPrivateEvents from '../../components/dashboardprivateevents/DashboardPrivateEVents';

const Page = () => {
  return (
    <div className=" flex flex-col h-screen bg-white">

        <DashboardNavbar />
        <div className='flex'>
        <Sidebar />
        <div className='w-full'>
        <nav className=" bg-white text-black py-4 px-6 flex justify-center space-x-8 border-b-2 border-color-100">
        <Link href="/dashboard/content" className="text-[#A62ED1] text-[13px]">
            HOME
            </Link>
            <Link href="/dashboard/experience" className='hover:text-[#A62ED1] text-[13px]'> 
            EXPERIENCE
            </Link>
            <Link href="/dashboard/dome" className='hover:text-[#A62ED1] text-[13px]'> 
            DOME
            </Link>
            <Link href="/dashboard/upcomingevents"  className="hover:text-[#A62ED1] text-[13px]">
            UPCMING EVENTS
            </Link>

            <Link href="/dashboard/corporateevents" className='hover:text-[#A62ED1] text-[13px]'>
            CORPORATE EVENTS
            </Link>
            <Link href="/dashboard/education" className='hover:text-[#A62ED1] text-[13px]'> 
            EDUCATION
            </Link>
        </nav>
        <div className='p-40'>
        <h1 className='text-4xl text-black font-black font-orbitron'>SESSIONS</h1>
        <div className=''>
        <DashboardExperience />
        </div>
        </div>

        <div className='p-40 bg-white border-t-2 border-gray-200'>
        <h1 className='text-4xl text-black font-black font-orbitron'>PRIVATE EVENTS</h1>
        <div className=''>
        <DashboardPrivateEvents />
        </div>
        </div>
        </div>
        </div>
      </div>
  );
};

export default Page;