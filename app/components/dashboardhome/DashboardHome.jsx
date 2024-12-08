import React from 'react';

const DashboardHome = () => {
  return (
    // <div className="min-h-screen flex flex-col items-center">
    <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
    <h1 className='text-white font-black text-4xl font-orbitron text-center'>Dashboard</h1>
    <div className='flex flex-wrap -mx-6'>
      <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
            <div className='p-3 '></div>
            <div className='mx-5'>
            <h1 className='p-3 bg-indigo-600'>8,282</h1>
            <div className='p-3 bg-indigo-600'>New Users</div>
      </div>
      <div className="w-full px-6 sm:w-1/2 xl:w-1/3"></div>
      <div className="w-full px-6 sm:w-1/2 xl:w-1/3"></div>
    </div>
    </div>
  </div>
  )
}

export default DashboardHome ;