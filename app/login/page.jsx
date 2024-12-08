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
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; 
      const response = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
  
        if (data.access_token) {

          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("token", data.access_token);
  
          router.push("/dashboard");
        } else {
          setError("Login failed: Token not found.");
        }
      } else if (response.status === 401 || response.status === 403) {
        setError("Unauthorized: Invalid credentials");
        router.push("/");
      } else {
        throw new Error("An error occurred. Please try again.");
        
      }
    } catch (err) {
      setError(err.message || "Failed to login");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#063828]">
      <div className="w-full max-w-lg space-y-6 bg-white py-20 px-10 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800">LOGIN</h2>
        {error && <p className="text-red-500">{error}</p>} 
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
            className="w-full cursor-pointer bg-gray-800 border border-primary bg-primary py-6 text-white font-black font-orbitron hover:bg-gradient-to-r hover:border-0 hover:bg-[#063828]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
