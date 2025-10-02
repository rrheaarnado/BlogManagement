import React from "react";
import { HomeIcon, BellIcon, DocumentTextIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onFilterChange, onLogout }) => {
    const navigate = useNavigate(); 

    const handleLogout = () => {
        localStorage.removeItem("auth"); // remove JWT/user info
        navigate("/"); // go to login
    };
    return (
        <div className="w-64 bg-white border border-gray-200 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-6">Sidebar</h2>
            <ul className="space-y-4">
                <li
                    className="flex items-center gap-2 cursor-pointer hover:text-gray-600"
                    onClick={() => onFilterChange("all")}
                >
                    <HomeIcon className="w-5 h-5" /> All Announcements
                </li>

                <li className="flex items-center gap-2 cursor-pointer hover:text-gray-600"
                    onClick={() => onFilterChange("my")}
                >
                    <DocumentTextIcon className="w-5 h-5" /> My Announcements
                </li>
                {/* <li className="flex items-center gap-2 cursor-pointer hover:text-gray-600">
                    <BellIcon className="w-5 h-5" /> Notifications
                </li> */}
                <li
                    className="flex items-center gap-2 cursor-pointer hover:text-gray-600"
                    onClick={handleLogout}
                >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" /> Logout
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
