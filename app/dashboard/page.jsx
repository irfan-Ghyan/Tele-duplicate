'use client'

import React from 'react';
import Sidebar from '../components/siderbar/Sidebar';
import DashboardNavbar from '../components/dashboardnavbar/Dashboardnavbar';
import DashboardHome from '../components/dashboardhome/DashboardHome';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';



const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/login'); 
    }
  }, [router]);
  return (

        <div className="flex h-screen bg-white">
          
        <div className="flex-1 ">
        <DashboardNavbar />
        <div className='flex '>
        <Sidebar />
        <DashboardHome />
      </div>
    </div>
    </div>
  )
}

export default Page;