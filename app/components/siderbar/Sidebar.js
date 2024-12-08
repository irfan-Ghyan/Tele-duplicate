import React from "react";
import Link from "next/link";
import { FaRegCalendarAlt, FaFileAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-60 overflow-x-auto bg-[#101010] p-4">
      <h2 className="text-3xl font-bold pt-20  text-white">Dashboard</h2>
      <ul className="flex flex-col justify-center">
        <Link href="/dashboard/booking" className="flex items-center text-white pt-6 hover:text-white">
          <FaRegCalendarAlt className="mr-2 " /> Booking
        </Link>
        <Link href="/dashboard/content" className="flex items-center  text-[#919191] pt-6 hover:text-white">
          <FaFileAlt className="mr-2" /> Content
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;

