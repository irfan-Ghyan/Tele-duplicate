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

const Page = () => {
  return (
    <div className=" flex flex-col h-screen">
        <DashboardNavbar />
        <div className='flex'>
        <Sidebar />
        <div className='w-full'>
        <DashboardMainNavbar/>
        <DashboardVideo/>
        <DashboardSession />
        <DashboardDomeSection />
        <FaqProvider>
          <DashboardFaq />
        </FaqProvider>
       
    
            </div>
        </div>
      </div>
  );
};

export default Page;
