import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 overflow-x-auto bg-[#ffffff] text-black p-4 border-r-2 border-gray-200 ">
      <h2 className="text-2xl font-bold mb-16 text-center">Dashboard</h2>
      <ul className="flex flex-col">
        <Link className="mb-4 hover:border-b-2 hover:border-b-[#A62ED1] p-2 text-center"  href="/">HOME</Link>
        <Link className="mb-4 hover:border-b-2 hover:border-b-[#A62ED1] p-2 text-center" href="/dashboardbooking">BOOKING</Link>
        <Link className="mb-4 hover:border-b-2 hover:border-b-[#A62ED1] p-2 text-center" href="/dashboardcontent">CONTENT</Link>
      </ul>
    </div>
  );
};

export default Sidebar;
