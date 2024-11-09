// // app/login/page.js
// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleLogin = (e) => {
//     e.preventDefault();


//     if (username === 'teleios' && password === 'teleios@2025') {
//       localStorage.setItem('isAuthenticated', 'true');
//       router.push('/dashboard');
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-800">
//       <div className="w-full max-w-lg  space-y-6 bg-white py-20 px-10">
//         <h2 className="text-2xl font-bold text-gray-800">LOGIN</h2>
//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="username">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-800 font-normal font-orbitron"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-400 font-normal font-orbitron"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full cursor-pointer bg-gray-800 border border-primary bg-primary py-6 text-white font-black font-orbitron hover:bg-gradient-to-r hover:border-0  hover:bg-[#D007A6]"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// };



// export default Login;


// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const response = await fetch("http://192.168.70.211:8000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//           "Authorization": "Bearer 19|37cdHkAKgGjXKBFsBA1Tw7hVIiwIh6rhzlSYWSpW55b86d34",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (response.status === 200) {
//         const data = await response.json();
//         localStorage.setItem("isAuthenticated", "true");
//         localStorage.setItem("token", data.token);
//         router.push("/dashboard"); 
//       } else if (response.status === 401) {
//         setError("Unauthorized: Invalid credentials");
//         router.push("/login"); 
//       } else {
//         throw new Error("An error occurred. Please try again.");
//       }
//     } catch (err) {
//       setError(err.message || "Failed to login");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-800">
//       <div className="w-full max-w-lg space-y-6 bg-white py-20 px-10">
//         <h2 className="text-2xl font-bold text-gray-800">LOGIN</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="username">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-800 font-normal font-orbitron"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-400 font-normal font-orbitron"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full cursor-pointer bg-gray-800 border border-primary bg-primary py-6 text-white font-black font-orbitron hover:bg-gradient-to-r hover:border-0 hover:bg-[#D007A6]"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      // Make the login request
      const response = await fetch("http://192.168.70.211:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ username, password }), // Send credentials
      });
  
      // Check if the response status is 200 (successful)
      if (response.status === 200) {
        const data = await response.json(); // Parse the JSON response
  
        // Check if the access_token is present in the response
        if (data.access_token) {
          // Store the token and authentication status in localStorage
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("token", data.access_token); // Store the access_token
  
          // Redirect to the dashboard after successful login
          router.push("/dashboard");
        } else {
          setError("Login failed: Token not found.");
        }
      } else if (response.status === 401) {
        // Handle unauthorized response (wrong credentials)
        setError("Unauthorized: Invalid credentials");
      } else {
        // Handle other errors
        throw new Error("An error occurred. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Failed to login");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-lg space-y-6 bg-white py-20 px-10">
        <h2 className="text-2xl font-bold text-gray-800">LOGIN</h2>
        {error && <p className="text-red-500">{error}</p>} {/* Show error messages */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-800 font-normal font-orbitron"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-400 font-normal font-orbitron"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-gray-800 border border-primary bg-primary py-6 text-white font-black font-orbitron hover:bg-gradient-to-r hover:border-0 hover:bg-[#D007A6]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
