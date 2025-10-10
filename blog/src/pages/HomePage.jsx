import Header from "../components/Header";
import PostList from "../components/PostList";
import BottomInputBar from "../components/BottomInputBar";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import { api } from "../api";
import { use, useEffect, useState } from "react";


function HomePage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth?.userId) return alert("Please login first");

  const userId = auth.userId;

  // Add new post
  const handleAddPost = async ({ title, content }) => {
    if (!userId) return alert("Please login first");

    const post = {
      title,
      content,
      isPublished: true,
      userId: userId
    };

    try {
      const createdPost = await api.createPost(post);
      setPosts(prev => [createdPost, ...prev]);
    } catch (err) {
      console.error("Failed to add post:", err);
    }
  };

  //Search Posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await api.getPosts();
        setPosts(posts);
        setFilteredPosts(posts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  //Live Search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!searchQuery.trim()) {
        setFilteredPosts(posts);
        return;
      }

      const results = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(results);
    }, 300); // debounce search typing
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, posts]);

  //Sort Post
  const handleSort = (option) => {
    setFilteredPosts((prevPosts) => {
      const sorted = [...prevPosts];

      if(option === "Latest"){
        sorted.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      }else if(option === "Oldest"){
        sorted.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if(option === "Title"){
        sorted.sort((a,b) => a.title.localeCompare(b.title));
      }
      return sorted;
    }); 
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">

      <div className="flex flex-1 overflow-hidden">
        {/*Main Content*/}
        <div className="flex-1 overflow-y-auto px-5 pt-3 bg-white">
          <div className="p-1 py-2 text-xl font-semibold">
            <h1>Announcements</h1>
          </div>
          <SearchBar setSearchQuery={setSearchQuery} onSort={handleSort}/>
          <PostList posts={filteredPosts} />
        </div>

      </div>
    </div>
  );
}

export default HomePage;
