import React from "react";


const DashboardNavbar = () => {
  return (
    <div className="flex items-center justify-between bg-[#A62ED1] text-white p-4">
      <div className="flex items-center space-x-4">
        <img src="/assets/images/dome/logo.png" alt="Logo" className="sm:w-[185px] sm:h-[52px] md:w-[185px] md:h-[52px] lg:w-[165px] lg:h-[42px] xl:w-[165px] xl:h-[42px]" />
      </div>
      <div className="space-x-2">
        <button className="text-white px-4 py-2 hover:text-gray-200">
          Login | Signup
        </button>

      </div>
    </div>
  );
};

export default DashboardNavbar;
