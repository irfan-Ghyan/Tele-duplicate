'use client'

import React from 'react';
import Link from 'next/link';
import Sidebar from '../../components/siderbar/Sidebar';
import DashboardNavbar from '../../components/dashboardnavbar/Dashboardnavbar';
import DashboardGaming from '../../components/dashboardgaming/DashboardGaming';
import DashboardVip from '../../components/dashboardvip/DashboardVip';
import DashboardStop from '../../components/dashboardstop/DashboardStop';
import DashboardSim from '../../components/dashboardsim/DashboardSim';
import DashboardLounge from '../../components/dashboardlounge/DashboardLounge';
import DashboardMainNavbar from '@/app/components/dashboardmainnavbar/DashboardMainNavbar';


const Page = () => {
  return (
    <div className=" flex flex-col h-screen bg-white">

        <DashboardNavbar />
        <div className='flex'>
        <Sidebar />
        <div className='w-full'>
        <DashboardMainNavbar/>
      
        <DashboardGaming />
        <DashboardVip />
        <DashboardStop />
        <DashboardSim />
        <DashboardLounge/>       
        </div>
        </div>
      </div>
  );
};

export default Page;
