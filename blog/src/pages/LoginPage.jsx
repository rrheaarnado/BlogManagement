import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // use react-router navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.login({ username, password });

      // Store JWT and user info in localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          userId: res.userId,
          username: res.username,
          token: res.token, // <-- store JWT
        })
      );

      navigate("/announcements"); // navigate to protected route
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      
      <div className="flex items-center justify-between">

      <div className="flex min-h-screen bg-black text-white justify-center items-start p-8 hidden md:flex flex-col px-60">
        <span className="text-7xl font-bold">NCast</span>
        <p>Share and Get timely Announcements with NCast.</p>
      </div>

      <div className="flex flex-4 items-center justify-center p-50">
        <div className="bg-white border border-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black-500"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Link to Register */}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <span
              className="text-black hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
          
        </form>
      </div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
