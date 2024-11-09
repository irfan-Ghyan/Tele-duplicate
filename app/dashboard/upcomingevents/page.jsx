
'use client'

import React from 'react';
import Link from 'next/link';
import Sidebar from '../../components/siderbar/Sidebar';
import DashboardNavbar from '../../components/dashboardnavbar/Dashboardnavbar';
import DashboardEvents from '../../components/dashboardevents/DashboardEvents';
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
    <div className=" flex flex-col h-screen bg-white">

        <DashboardNavbar />
        <div className='flex'>
        <Sidebar />
        <div className='w-full'>
        <DashboardMainNavbar/>
        <div className='p-40'>
        <h1 className='text-4xl text-black font-black font-orbitron'>UPCOMING EVENTS</h1>
        <div className=''>
        <DashboardEvents />
        </div>
        </div>
        </div>
        </div>
      </div>
  );
};

export default Page;