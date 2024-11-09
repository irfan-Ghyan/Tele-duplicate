// app/login/page.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();


    if (username === 'teleios' && password === 'teleios@2025') {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-lg  space-y-6 bg-white py-20 px-10">
        <h2 className="text-2xl font-bold text-gray-800">LOGIN</h2>
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
            className="w-full cursor-pointer bg-gray-800 border border-primary bg-primary py-6 text-white font-black font-orbitron hover:bg-gradient-to-r hover:border-0  hover:bg-[#D007A6]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
};

export default Login;



