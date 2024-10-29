
import React from 'react';
import Sidebar from '../components/siderbar/Sidebar';
import DashboardNavbar from '../components/dashboardnavbar/Dashboardnavbar';
import DashboardHome from '../components/dashboardhome/DashboardHome';



const Page = () => {
  return (

        <div className="flex h-screen">
          
      <div className="flex-1 ">
        <DashboardNavbar />
        <div className='flex'>
        <Sidebar />
        <DashboardHome />
      </div>
    </div>
    </div>
  )
}

export default Page;