import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-80 overflow-x-auto bg-[#ffffff] text-black p-4 border-r-2 border-gray-200 ">
      <h2 className="text-2xl font-bold mb-16 text-center">Dashboard</h2>
      <ul className="flex flex-col items-center justify-center">
        <Link className="w-[100px] mb-4 text-[#A62ED1] hover:border-b-2 hover:border-b-[#A62ED1] p-2 "  href="/dashboard">HOME</Link>
        <Link className="w-[100px] mb-4 hover:border-b-2 hover:border-b-[#A62ED1] p-2 " href="/dashboard/booking">BOOKING</Link>
        <Link className="w-[100px] mb-4 hover:border-b-2 hover:border-b-[#A62ED1] p-2 " href="/dashboard/content">CONTENT</Link>
      </ul>
    </div>
  );
};

export default Sidebar;
