import { Bars3Icon, CalendarDateRangeIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import Modal from "./Modal";
import StatusModal from "./StatusModal";
import PostList from "./PostList";
import { api } from "../api";
import { useState, useRef, useEffect } from "react";


const SearchBar = ({ onAdd, setSearchQuery }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const editorRef = useRef(null);

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  })

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.style.minHeight = "150px";
      editor.style.maxHeight = "300px";
      editor.style.overflowY = "auto";
    }
  }, []);

  //Create New Announcement
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      await api.createPost({
        title,
        content,
        isPublished: true,
      });

      setTitle("");
      setContent("")
      if (editorRef.current) editorRef.current.innerHTML = "";
      setIsModalOpen(false);
      setModal({
        isOpen: true,
        type: "success",
        title: "Success",
        message: "Announcement posted successfully",
      });
    } catch (err) {
      console.log(err);
      setModal({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Error in posting announcement. Please try again"
      })
    }
    };

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

          {/* Date Button */}
          <div className="hover:bg-gray-100 hover:text-white rounded-lg border border-gray-200">
            <button className="flex items-center gap-2 text-gray-700 py-2 px-4 rounded-xl whitespace-nowrap cursor-pointer">
              <CalendarDateRangeIcon className="w-5 h-5 text-gray-700" />
              <span>Any Date</span>
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

          {/* Create Button */}
          <button
            className="flex items-center gap-1 bg-black text-white py-2 px-4 rounded-xl hover:bg-zinc-700 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon className="w-5 h-5 text-gray-200" />
            <span>Create</span>
          </button>
        </div>

        {/* MODALS */}
        {/*Create Announcement Modal*/}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleAdd} className="flex flex-col gap-2">
            <h2 className="text-xl text-center font-semibold mb-4">
              Post Announcement
            </h2>

            <label className="font-semibold">Announcement Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
              className="border border-gray-300 shadow-sm p-2 w-full rounded mb-4 focus:outline-none"
              required
            />

            <label className="font-semibold">Content</label>
            <div
              ref={editorRef}
              contentEditable
              className="border p-2 w-full rounded min-h-[150px] max-h-[300px] overflow-y-auto focus:outline-none border-gray-300 shadow-sm"
              suppressContentEditableWarning={true}
              onInput={(e) => setContent(e.currentTarget.innerHTML)}
            ></div>

            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="bg-black text-white justify-center px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Post
              </button>
            </div>
          </form>
        </Modal>

        
        {/* Status Modal */}
        <StatusModal
          isOpen={modal.isOpen}
          type={modal.type}
          message={modal.message}
          onClose={() => setModal({ ...modal, isOpen: false })}
        />



      </>
    );
  };

  export default SearchBar;
