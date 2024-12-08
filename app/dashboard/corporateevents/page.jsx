
'use client'

import React from 'react';
import Link from 'next/link';
import Sidebar from '../../components/siderbar/Sidebar';
import DashboardNavbar from '../../components/dashboardnavbar/Dashboardnavbar';
import DashboardBuildingEvents from '../../components/dashboardbuildingevents/DashboardBuildingEvents';
import DashboardNetworking from '../../components/dashboardnetworking/DashboardNetworking';
import DashboardConference from '../../components/dashboardconference/DashboardConference';
import DashboardVenueBranding from '../../components/dashboardvenuebranding/DashboardVenueBranding';
import DashboardMainNavbar from '../../components/dashboardmainnavbar/DashboardMainNavbar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/login'); 
    }
  }, [router]);
  
  return (
    <div className=" flex flex-col h-screen bg-gray-200">

        <DashboardNavbar />
        <div className='flex'>
        <Sidebar />
        <div className='w-full'>
        <DashboardMainNavbar/>

        <div className='px-40 bg-gray-200'>
        <DashboardBuildingEvents />
        </div>

        <div className='px-40 bg-gray-200'>
        <DashboardNetworking />
        </div>

        <div className='px-40 bg-gray-200'>
        <DashboardConference />
        </div>


        <div className='px-40 bg-gray-200'>
        <DashboardVenueBranding />
        </div>

        </div>
        </div>
      </div>
  );
};

export default Page;