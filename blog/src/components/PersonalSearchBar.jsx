import { Bars3Icon, CalendarDateRangeIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import Modal from "./Modal";
import StatusModal from "./StatusModal";
import PostList from "./PostList";
import { api } from "../api";
import { useState, useRef, useEffect } from "react";


const PersonalSearchBar = ({ setSearchQuery }) => {

    return (
      <>
        <div className="flex gap-2 bg-white border border-gray-200 rounded-lg p-3 items-center shadow-sm">

          {/* Sort Button */}
          <div className="hover:bg-gray-100 hover:text-white rounded-lg border border-gray-200">
            <button className="flex items-center gap-2 text-black py-2 px-4 rounded-xl whitespace-nowrap cursor-pointer">
              <Bars3BottomRightIcon className="w-5 h-5 text-gray-700" />
              <span>Sort by</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="flex items-center w-full bg-white border border-gray-300 shadow-sm rounded-lg px-3 py-2 ">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 mr-2" />
            
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Announcement"
              className="w-full focus:outline-none "
            />
          </div>
        </div>

        {/* MODALS */}
      </>
    );
  };

  export default PersonalSearchBar;
