

import React, { useEffect, useState } from 'react';
import DashboardCard from '../../components/dashboardcard/DashboardCard.jsx';
import { FaUser, FaCalendarCheck, FaCheckCircle } from 'react-icons/fa';
import BookingCalendar from '../bookingcalendar/Bookingcalendar';
import { Helmet } from 'react-helmet-async';
import Head from 'next/head';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const DashboardHome = () => {
  const [numUsers, setNumUsers] = useState(0);
  const [availableSlots, setAvailableSlots] = useState(0);
  const [bookedSlots, setBookedSlots] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/bookings/availableSlots`);
        const data = await response.json();
        

        const capacity = 14;

        // Sum all sims to get total available spots (or persons that can be accommodated)
        const totalAvailable = data.reduce((acc, slot) => acc + (slot.sims || 0), 0);
        
        // Calculate total busy (booked) spots
        const totalBusy = data.reduce((acc, slot) => acc + (capacity - (slot.sims || 0)), 0);
        
        // If "number of person" means total availability across all slots:
        const numberOfPerson = totalAvailable;

        setNumUsers(numberOfPerson);
        setAvailableSlots(totalAvailable);
        setBookedSlots(totalBusy);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const cards = [
    { name: 'Number of Person', status: numUsers, icon: <FaUser /> },
    { name: 'Booked slot', status: bookedSlots, icon: <FaCalendarCheck /> },
    { name: 'Available slot', status: availableSlots, icon: <FaCheckCircle /> },
  ];

  return (

    <>
    <Helmet>
            <title>Dashboard </title>
            <meta
              name="description"
            
            />
            <meta property="og:title" content="Home | Teleios Dome" />
            <meta
              
            />
            <meta property="og:type" content="website" />
            {/* <link rel="canonical" href="/" /> */}
          </Helmet>
          <Head>
          <link rel="preload" href="" as="image" />
          <link rel="preload" href="" as="image" />
        </Head>
    <div className="w-full bg-gray-200 px-40 py-20">
      <h1 className='text-4xl font-black'>Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 text-center text-2xl">
        {cards.map((card, index) => (
          <DashboardCard
            key={index}
            userName={card.name}
            status={card.status}
            icon={card.icon}
          />
        ))}
      </div>
      <BookingCalendar />
    </div>
    </>
  );
};

export default DashboardHome;
