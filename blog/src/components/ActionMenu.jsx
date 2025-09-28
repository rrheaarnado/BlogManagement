// src/components/ActionMenu.jsx
import React, { useState, useRef, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

const ActionMenu = ({ actions }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={menuRef}>
            {/* Dots button */}
            <button
                onClick={() => setOpen(!open)}
                className="text-black text-md hover:text-gray-500 px-2 py-1"
            >
                <HiOutlineDotsVertical size={15} />
            </button>

            {/* Dropdown menu */}
            {open && (
                <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {actions.map((action, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                action.onClick();
                                setOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${action.danger ? "text-red-600 hover:bg-red-100" : "text-gray-700"
                                }`}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActionMenu;
