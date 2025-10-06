import React, { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

const Header = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (!auth?.userId || !auth.token) {
          navigate("/"); // redirect to login if no auth info
          return;
        }

        const user = await api.getUser(auth.userId);
        if (user?.username) {
          setUsername(user.username);
        } else {
          // If user not found, clear auth and redirect
          localStorage.removeItem("auth");
          navigate("/");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        localStorage.removeItem("auth");
        navigate("/"); // redirect to login on error
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div>Announcements</div>
        <div className="flex items-center hidden md:flex gap-1">
          <UserIcon className="w-5 h-5" /> {username ? username : "User Login"}
        </div>
      </div>
    </header>
  );
};

export default Header;
