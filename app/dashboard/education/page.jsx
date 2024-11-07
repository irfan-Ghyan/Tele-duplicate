
'use client'

import React from 'react';
import Link from 'next/link';
import Sidebar from '../../components/siderbar/Sidebar';
import DashboardNavbar from '../../components/dashboardnavbar/Dashboardnavbar';
import DashboardSafetyDriving from '../../components/dashboardsafetydriving/DashboardSafetyDriving';
import DashboardEducationalVisit from '../../components/dashboardeducationalvisit/DashboardEducationalVisit';
import DashboardWhyTeleios from '../../components/dashboardwhyteleios/DashboardWhyTeleios';
import DashboardMainNavbar from '../../components/dashboardmainnavbar/DashboardMainNavbar';


const Page = () => {
  return (
    <div className=" flex flex-col h-screen bg-white">

        <DashboardNavbar />
        <div className='flex'>
        <Sidebar />
        <div className='w-full'>
        <DashboardMainNavbar/>
      
        <DashboardEducationalVisit />
        <DashboardSafetyDriving />
        <DashboardWhyTeleios />
        </div>
        </div>
      </div>
  );
};

export default Page;