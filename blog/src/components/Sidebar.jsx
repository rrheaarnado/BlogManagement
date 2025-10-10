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
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Sidebar = ({ onFilterChange }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/");
    };

    return (
        <div className="flex flex-col justify-between h-full w-60 px-1 py-3 bg-black text-white shadow-md">

            {/* Top Section */}
            <div className="">
                <div className="flex mb-10 px-4">
                    <span className="font-bold text-2xl">NCast</span>
                </div>
                <ul className="flex flex-col space-y-1">

                    {/*Profile*/}
                    <li>
                        <NavLink
                            to={`/profile`}
                            className={({ isActive }) =>
                                `flex w-full items-center gap-2 cursor-pointer hover:bg-white hover:text-black rounded-lg py-3 px-2 transition-all duration-150
                                ${isActive ? "bg-white text-black font-semibold" : "text-white"}`
                            }
                        >
                            <UserCircleIcon className="w-6 h-6" />
                            <span>Profile</span>
                        </NavLink>
                    </li>

                    {/*Announcements*/}
                    <li>
                        <NavLink
                            to={`/announcements`}
                            className={({ isActive }) =>
                                `flex w-full items-center gap-2 cursor-pointer hover:bg-white hover:text-black rounded-lg py-3 px-2 transition-all duration-150
                                ${isActive ? "bg-white text-black font-semibold" : "text-white"}`
                            }
                        >
                            <DocumentDuplicateIcon className="w-6 h-6" />
                            <span>Announcements</span>
                        </NavLink>
                    </li>

                    {/*Notifications*/}
                    <li>
                        <NavLink
                            to={`/notifications`}
                            className={({ isActive }) =>
                                `flex w-full items-center gap-2 cursor-pointer hover:bg-white hover:text-black rounded-lg py-3 px-2 transition-all duration-150
                                ${isActive ? "bg-white text-black font-semibold" : "text-white"}`
                            }
                        >
                            <BellAlertIcon className="w-6 h-6" />
                            <span>Notifications</span>
                        </NavLink>
                    </li>

                    {/*Logs*/}
                    {/* <NavLink
                        to={`/`}
                        className={({ isActive }) =>
                            `flex w-full items-center gap-2 cursor-pointer hover:bg-white hover:text-black rounded-lg py-3 px-2 transition-all duration-150
                                ${isActive ? "bg-white text-black font-semibold" : "text-white"}`
                        }
                    >
                        <Cog6ToothIcon className="w-6 h-6" />
                        <span>Logs</span>
                    </NavLink> */}

                </ul>
            </div>

            {/* Logout*/}
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
