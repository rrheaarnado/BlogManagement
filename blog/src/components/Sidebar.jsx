import React from "react";
import { HomeIcon, BellIcon, DocumentTextIcon, ArrowRightOnRectangleIcon, Bars2Icon, Bars3Icon, BellAlertIcon, DocumentDuplicateIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { useState} from "react";

const Sidebar = ({ onFilterChange, onLogout }) => {

    const navigate = useNavigate(); 
    const [isOpen, SetIsOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("auth"); // remove JWT/user info
        navigate("/"); // go to login
    };
    return (
        <div 
            className={`min-h-screen px-4 py-5 bg-black text-white border border-black m-0 shadow-md transition-all duration-300 ease-in-out
            ${isOpen ? "w-60 px-4 py-5" : "w-15 px-2 py-3 items-center"}`}>

            {/*Icons inside Sidebar*/}
            <div className="flex mb-10 gap-2">  
                {isOpen}
                <Bars3Icon 
                className="w-6 h-6"
                onClick={() => SetIsOpen(!isOpen)} 
                /> 
            </div>

            <ul className={`space-y-7 ${!isOpen     ? "flex flex-col items-center" : ""}`}>

                <li
                className="flex items-stretch gap-2 cursor-pointer mb-15">
                    {isOpen ? (
                        <>
                            <UserIcon className="w-8 h-8 font-bold" />
                            <span className="font-bold text-lg self-end">Welcome, User</span>
                        </>
                    ) : (
                            <UserIcon className="w-7 h-7" />    
                    )}
                    
                </li>

                 <li
                    className="flex items-center gap-2 cursor-pointer hover:text-gray-300"
                    onClick={() => onFilterChange("all")}
                >
                    {isOpen ? (
                        <>
                            <HomeIcon className="w-6 h-6" />
                            <span>Dashboard</span>
                        </>
                    ) : (
                            <HomeIcon className="w-7 h-7" />    
                    )}
                </li>
                    
                <li
                    className="flex items-center gap-2 cursor-pointer hover:text-gray-300"
                    onClick={() => onFilterChange("all")}
                >
                    {isOpen ? (
                        <>
                            <DocumentDuplicateIcon className="w-6 h-6" />
                            <span>All Announcements</span>
                        </>
                    ) : (
                            <DocumentDuplicateIcon className="w-7 h-7" />    
                    )}
                </li>

                <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300"
                    onClick={() => onFilterChange("my")}
                >
                    {isOpen ? (
                        <>
                            <DocumentTextIcon className="w-5 h-5" />
                            <span>My Announcements</span>
                        </>
                    ) : (
                            <DocumentTextIcon className="w-7 h-7" />
                    )}
                </li>

                <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300"
                    onClick={() => onFilterChange()}
                >
                    {isOpen ? (
                        <>
                            <BellAlertIcon className="w-5 h-5" />
                            <span>Notifications</span>
                        </>
                    ) : (
                            <BellAlertIcon className="w-7 h-7" />
                    )}
                  
                </li>
                {/* <li className="flex items-center gap-2 cursor-pointer hover:text-gray-600">
                    <BellIcon className="w-5 h-5" /> Notifications
                </li> */}
                <div className="absolute bottom-0 mb-5">
                    <li
                    className="flex items-center bottom-0 gap-2 cursor-pointer hover:text-gray-300"
                    onClick={handleLogout}
                >
                
                    {isOpen ? (
                        <>
                        <ArrowRightOnRectangleIcon className="w-7 h-7" /> 
                        <span>Logout</span>
                        </>
                    ) : (
                            <ArrowRightOnRectangleIcon className="w-7 h-7" />    
                    )}

                </li>
                </div>
            </ul>
        </div>
    );
};

export default Sidebar;
