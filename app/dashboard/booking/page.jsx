
import React from 'react';
import Sidebar from '../../components/siderbar/Sidebar';
import DashboardNavbar from '../../components/dashboardnavbar/Dashboardnavbar';
import DashboardData from '../../components/dashboarddata/DashboardData'



const Page = () => {
  return (
    // <div className="min-h-screen flex flex-col items-center">
        <div className="flex h-screen">
         
       
      <div className="flex-1 ">
        <DashboardNavbar />
        <div className='flex'>
        <Sidebar />
        <DashboardData />
      </div>
    </div>
    // </div>
  )
}

export default Page;