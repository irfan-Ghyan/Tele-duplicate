

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const DashboardMainNavbar = () => {
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    // Only set the active path once on client side
    setActivePath(window.location.pathname);
  }, []);

  const getLinkClassName = (path) => {
    return activePath === path
      ? 'text-[#A002718] text-[16px] font-black '
      : 'hover:text-[#919191]  text-[16px]'; 
  };

  return (
    <div>
      <nav className="bg-[#101010] text-white pt-6 hover:text-white py-4 flex space-x-8 border-b-2 border-color-100 px-40">
        <Link href="/dashboard/content" className={getLinkClassName('/dashboard/content') }>Home</Link>
        <Link href="/dashboard/experience" className={getLinkClassName('/dashboard/experience')}>Experience</Link>
        <Link href="/dashboard/dome" className={getLinkClassName('/dashboard/dome')}>Venue</Link>
        <Link href="/dashboard/upcomingevents" className={getLinkClassName('/dashboard/upcomingevents')}>Watch Parties</Link>
        <Link href="/dashboard/corporateevents" className={getLinkClassName('/dashboard/corporateevents')}>Private Events</Link>
        <Link href="/dashboard/education" className={getLinkClassName('/dashboard/education')}>F&B</Link>
      </nav>
    </div>
  );
};

export default DashboardMainNavbar;
