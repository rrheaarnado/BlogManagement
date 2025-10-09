import React, { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import logo from "../assets/ncast-logo.png";
import { BellAlertIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";


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
    <header className="bg-black text-white sticky top-0 z-50 shadow-md py-3">
      <div className="container flex justify-between items-center">
        <div className="flex justify-center gap-2 ml-4 items-center">
          <span className="font-semibold text-2xl px-5">NCast</span>
        </div>

      </div>
    </header>
  );
};

export default Header;
