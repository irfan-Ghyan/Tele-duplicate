import React from "react";
import { useRouter } from 'next/navigation';

const DashboardNavbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await fetch('http://192.168.70.205:8000/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          console.log('Logout successful'); // Log success message

          // Clear both 'authToken' and 'isAuthenticated' from localStorage
          localStorage.removeItem('token'); // Remove the 'token' stored during login
          localStorage.removeItem('isAuthenticated'); // Remove the authentication status

          // Debugging: Log to ensure items are removed
          console.log('Token removed:', !localStorage.getItem('token'));
          console.log('isAuthenticated removed:', !localStorage.getItem('isAuthenticated'));

          // Redirect to login page after a slight delay to ensure localStorage is cleared
          setTimeout(() => {
            router.push('/login'); // Navigate to login page
          }, 100); // 100ms delay to ensure the localStorage changes reflect
        } else {
          console.error('Logout failed', response.status); // If the logout request fails
        }
      } catch (error) {
        console.error('Error during logout:', error); // Handle any errors that occur during the logout request
      }
    } else {
      console.log('No token found'); // If there is no token, just remove items and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      
      // Debugging: Log to confirm removal
      console.log('Token removed:', !localStorage.getItem('token'));
      console.log('isAuthenticated removed:', !localStorage.getItem('isAuthenticated'));
      
      router.push('/login'); // Redirect to login page
    }
  };

  return (
    <div className="flex items-center justify-between bg-[#063828] text-[#e3ce90] p-4">
      <div className="flex items-center space-x-4 px-8">
        <img
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
