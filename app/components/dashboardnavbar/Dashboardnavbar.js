import React from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const DashboardNavbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${baseUrl}/api/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          console.log('Logout successful'); 

          localStorage.removeItem('token');
          localStorage.removeItem('isAuthenticated');

          console.log('Token removed:', !localStorage.getItem('token'));
          console.log('isAuthenticated removed:', !localStorage.getItem('isAuthenticated'));

          setTimeout(() => {
            router.push('/login');
          }, 100);
        } else {
          console.error('Logout failed', response.status);
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    } else {
      console.log('No token found');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      
      console.log('Token removed:', !localStorage.getItem('token'));
      console.log('isAuthenticated removed:', !localStorage.getItem('isAuthenticated'));
      
      router.push('/login');
    }
  };

  return (
    <div className="flex items-center justify-between bg-[#00352F] text-[#e3ce90] p-4">
      <div className="flex items-center space-x-4 px-8">
        <Image
        width={165}
        height={100}
          src="/assets/images/dome/logo.png"
          alt="Logo"
          className="sm:w-[185px] sm:h-[52px] md:w-[185px] md:h-[52px] lg:w-[165px] lg:h-[100px] xl:w-[165px] xl:h-[100px]"
        />
      </div>
      <div className="space-x-2">
        <button onClick={handleLogout} className="text-white px-4 py-2 hover:text-gray-200">
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
