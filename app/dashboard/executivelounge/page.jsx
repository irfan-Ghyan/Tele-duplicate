
'use client'

import React from 'react';
import Link from 'next/link';
import Sidebar from '../../components/siderbar/Sidebar';
import DashboardNavbar from '../../components/dashboardnavbar/Dashboardnavbar';
import DashboardExecutiveLounge from '../../components/dashboardexecutivelounge/DashboardExecutiveLounge';
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
        <div className='bg-white'>
        <DashboardExecutiveLounge />
        </div>
        </div>
        </div>
      </div>
  );
};

export default Page;