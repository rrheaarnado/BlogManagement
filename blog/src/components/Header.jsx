import React, { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { api } from "../api"; // make sure this points to your API client

const Header = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem("user"));
                if (!userData?.userId) return; // <-- use userId, not id

                // Fetch user info from backend
                const user = await api.getUser(userData.userId);
                if (user && user.username) {
                    setUsername(user.username);
                }
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };

        fetchUser();
    }, []);


    return (
        <header className="bg-black text-white sticky top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <div>Announcements</div>

                {/* User Login */}
                <div className="flex items-center hidden md:flex gap-1">
                    <UserIcon className="w-5 h-5" /> {username ? username : "User Login"}
                </div>
            </div>
        </header>
    );
};

export default Header;
