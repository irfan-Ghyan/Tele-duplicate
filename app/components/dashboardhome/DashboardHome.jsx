
import React from 'react';
import DashboardCard from '../../components/dashboardcard/DashBoardcard.jsx'
import { FaUser, FaCalendarCheck, FaCheckCircle } from 'react-icons/fa';
import BookingCalendar from '../bookingcalendar/Bookingcalendar';

const DashboardHome = () => {
  const users = [
    { name: 'User', status: '10', icon: <FaUser /> },
    { name: 'Booked slot', status: '20', icon: <FaCalendarCheck /> },
    { name: 'Available slot', status: '2', icon: <FaCheckCircle /> },
  ];

  return (
    <div className="w-full bg-gray-200 px-40 py-20 ">
      <h1 className='text-4xl font-black'>Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4  text-center text-2xl">
        {users.map((user, index) => (
          <DashboardCard
            key={index}
            userName={user.name}
            status={user.status}
            icon={user.icon}
          />
        ))}
      </div>
      <BookingCalendar />
    </div>
  );
};

export default DashboardHome;
