'use client'

import React from 'react';
import Link from 'next/link';
import Sidebar from '../../components/siderbar/Sidebar';
import DashboardNavbar from '../../components/dashboardnavbar/Dashboardnavbar';
import DashboardVideo from '@/app/components/dashboardvideo/DashboardVideo';
import DashboardSession from '@/app/components/dashboardsession/DashboardSession';
import DashboardDomeSection from '@/app/components/dashboarddomesection/DashboardDomeSection';
import DashboardFaq from '@/app/components/dashboardfaq/DashboardFaq';
import { FaqProvider } from '../../FaqContext';
import DashboardMainNavbar from '../../components/dashboardmainnavbar/DashboardMainNavbar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardExperience from '@/app/components/dashboardsession/DashboardSession';
import DashboardPrice from '../../components/dashboardprice/DashboardPrice'

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/login'); 
    }
  }, [router]);
  return (
    <div className=" flex flex-col h-screen">
        <DashboardNavbar />
        <div className='flex h-screen'>
        <Sidebar />
        <div className='w-full h-screen'>
        <DashboardMainNavbar/>
        <DashboardPrice />
       
            </div>
        </div>
      </div>
  );
};

export default Page;