
'use client'

import React from 'react';
import Link from 'next/link';
import Sidebar from '../../components/siderbar/Sidebar';
import DashboardNavbar from '../../components/dashboardnavbar/Dashboardnavbar';
import DashboardExperience from '../../components/dashboardexperience/DashboardExperience';
import DashboardPrivateEvents from '../../components/dashboardprivateevents/DashboardPrivateEvents';
import DashboardMainNavbar from '@/app/components/dashboardmainnavbar/DashboardMainNavbar';
import DashboardCoaching from '@/app/components/dashboardcoaching/DashboardCoaching';

const Page = () => {
  return (
    <div className=" flex flex-col h-screen bg-white">

        <DashboardNavbar />
        <div className='flex'>
        <Sidebar />
        <div className='w-full'>
        <DashboardMainNavbar/>
      
          <DashboardExperience />
        <DashboardPrivateEvents />
        <DashboardCoaching />

        </div>
        </div>
      </div>
  );
};

export default Page;