// import React from "react";


// const DashboardNavbar = () => {
//   return (
//     <div className="flex items-center justify-between bg-[#A62ED1] text-white p-4">
//       <div className="flex items-center space-x-4">
//         <img src="/assets/images/dome/logo.png" alt="Logo" className="sm:w-[185px] sm:h-[52px] md:w-[185px] md:h-[52px] lg:w-[165px] lg:h-[42px] xl:w-[165px] xl:h-[42px]" />
//       </div>
//       <div className="space-x-2">
//         <button className="text-white px-4 py-2 hover:text-gray-200">
//           Logout
//         </button>

//       </div>
//     </div>
//   );
// };

// export default DashboardNavbar;


import React from "react";
import { useRouter } from 'next/navigation';

const DashboardNavbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // Get the token from localStorage or wherever it's stored
    const token = localStorage.getItem('authToken');

    // If token is available, send a logout request to the API
    if (token) {
      try {
        const response = await fetch('http://192.168.70.211:8000/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          // Clear local storage and redirect to login page if logout is successful
          localStorage.removeItem('authToken');  // Or 'isAuthenticated', based on your storage
          localStorage.removeItem('isAuthenticated');
          router.push('/login');  // Redirect to login page
        } else {
          // Handle error, for example, showing a message
          console.error('Logout failed', response.status);
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    } else {
      console.log('No token found');
      router.push('/login'); 
    }
  };

  return (
    <div className="flex items-center justify-between bg-[#A62ED1] text-white p-4">
      <div className="flex items-center space-x-4">
        <img
          src="/assets/images/dome/logo.png"
          alt="Logo"
          className="sm:w-[185px] sm:h-[52px] md:w-[185px] md:h-[52px] lg:w-[165px] lg:h-[42px] xl:w-[165px] xl:h-[42px]"
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

