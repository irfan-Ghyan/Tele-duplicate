

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
      ? 'text-[#A002718] text-[13px] font-bold '
      : 'hover:text-[#e3ce90] text-[13px]'; 
  };

  return (
    <div>
      <nav className="bg-white text-[#002718] py-4 px-6 flex justify-center space-x-8 border-b-2 border-color-100">
        <Link href="/dashboard/content" className={getLinkClassName('/dashboard/content')}>HOME</Link>
        <Link href="/dashboard/experience" className={getLinkClassName('/dashboard/experience')}>EXPERIENCE</Link>
        <Link href="/dashboard/dome" className={getLinkClassName('/dashboard/dome')}>VENUE DOME</Link>
        <Link href="/dashboard/upcomingevents" className={getLinkClassName('/dashboard/upcomingevents')}>WATCH PARTIES</Link>
        <Link href="/dashboard/corporateevents" className={getLinkClassName('/dashboard/corporateevents')}>PRIVATE EVENTS</Link>
        <Link href="/dashboard/education" className={getLinkClassName('/dashboard/education')}>F&B</Link>
      </nav>
    </div>
  );
};

export default DashboardMainNavbar;
