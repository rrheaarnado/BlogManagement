import React from "react";
import {
    UserCircleIcon,
    DocumentDuplicateIcon,
    BellAlertIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ncast-logo.png";

const Sidebar = ({ onFilterChange }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/");
    };

    return (
        <div className="flex flex-col justify-between h-full w-60 px-1 py-3 bg-black text-white shadow-md">
            
            {/* Top Section */}
            <div>
                <div className="flex mb-10 px-4">
                     <span className="font-bold text-2xl">NCast</span>
                    </div>
                <ul className="flex flex-col space-y-1">
                    <li
                        className="flex items-center gap-2 cursor-pointer hover:bg-white hover:text-black rounded-lg py-3 px-2 transition-all duration-150"
                        onClick={() => onFilterChange("profile")}
                    >
                        <UserCircleIcon className="w-6 h-6" />
                        <span>Profile</span>
                    </li>

                    <li
                        className="flex items-center gap-2 cursor-pointer hover:bg-white hover:text-black rounded-lg py-3 px-2 transition-all duration-150"
                        onClick={() => onFilterChange("announcements")}
                    >
                        <DocumentDuplicateIcon className="w-6 h-6" />
                        <span>Announcements</span>
                    </li>

                    <li
                        className="flex items-center gap-2 cursor-pointer hover:bg-white hover:text-black rounded-lg py-3 px-2 transition-all duration-150"
                        onClick={() => onFilterChange("notifications")}
                    >
                        <BellAlertIcon className="w-6 h-6" />
                        <span>Notifications</span>
                    </li>

                    <li
                        className="flex items-center gap-2 cursor-pointer hover:bg-white hover:text-black rounded-lg py-3 px-2 transition-all duration-150"
                        onClick={() => onFilterChange("settings")}
                    >
                        <Cog6ToothIcon className="w-6 h-6" />
                        <span>Logs</span>
                    </li>
                </ul>
            </div>

            {/* Logout pinned at bottom */}
            <div>
                <li
                    className="flex items-center gap-2 cursor-pointer hover:bg-white hover:text-black rounded-lg py-2 px-2 transition-all duration-150"
                    onClick={handleLogout}
                >
                    <ArrowRightOnRectangleIcon className="w-6 h-6" />
                    <span>Logout</span>
                </li>
            </div>
        </div>
    );
};

export default Sidebar;
