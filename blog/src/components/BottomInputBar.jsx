import React, { useState, useRef, useEffect } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import Modal from "./Modal";
import StatusModal from "./StatusModal";
import { api } from "../api";
import PostList from "../components/PostList";

const FloatingBottomBar = ({ onAdd, onSearch }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const editorRef = useRef(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  });

  // Live search as user types
  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]); // clear results if empty
        return;
      }
      try {
        const posts = await api.getPosts();
        const results = posts.filter(
          (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, [searchQuery]);


  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.style.minHeight = "150px";
      editor.style.maxHeight = "300px";
      editor.style.overflowY = "auto";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {

      await api.createPost({
        title,
        content,
        isPublished: true,
      });

      setTitle("");
      setContent("");
      if (editorRef.current) editorRef.current.innerHTML = "";
      setIsModalOpen(false);
      setModal({
        isOpen: true,
        type: "success",
        title: "Success",
        message: "Post added successfully!",
      });

    } catch (err) {
      console.error(err);
      setModal({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to add post. Please try again.",
      });
    }
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const posts = await api.getPosts();
      const results = posts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setIsSearchModalOpen(true);
    } catch (err) {
      console.error(err);
      setModal({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to search posts.",
      });
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black shadow-xl rounded-full flex items-center gap-2 px-4 py-2">
        {/* Search button */}
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="flex items-center justify-center gap-1 text-white p-2 rounded-full hover:bg-gray-500 hover:text-white"
        >
          <FiSearch className="w-5 h-5" /> Search
        </button>

        {/* Create button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-1 text-white p-2 rounded-full hover:bg-gray-500 hover:text-white"
        >
          <FiPlus className="w-5 h-5" /> Create
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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

      {/* Search Modal */}
      <Modal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)}>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-xl text-center font-semibold mb-4">
            Search Announcements
          </h2>

          <label className="font-semibold">Search Query</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter keyword..."
            className="border border-gray-300 shadow-sm p-2 w-full rounded mb-4 focus:outline-none"
          />

          <div className="flex flex-col gap-2 w-full max-h-[80vh] overflow-y-auto">
            {searchResults.length > 0 ? (
              <PostList posts={searchResults} fullWidth />
            ) : (
              <p className="text-gray-500 text-center mt-2">No posts found.</p>
            )}
          </div>

        </div>
      </Modal>
      
      <StatusModal
        isOpen={modal.isOpen}
        type={modal.type}
        message={modal.message}
        onClose={() => setModal({ ...modal, isOpen: false })}
      />
    </>
  );
};

export default FloatingBottomBar;
