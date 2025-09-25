import React from "react";
import {UserIcon } from "@heroicons/react/24/solid";

const Header = () => {
    return(
        <header className="bg-black text-white sticky top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/*Logo */}
                <div>OpBlog</div>

                {/*Button */}
                <div className="flex items-center hidden md:flex gap-1">
                    <UserIcon className="w-5 h-5" /> User Login
                </div>
            </div>
        </header>
    );
};

export default Header;