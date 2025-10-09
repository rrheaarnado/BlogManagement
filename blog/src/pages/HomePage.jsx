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

  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className="sticky">
          <Sidebar onFilterChange={setFilteredPosts} />
        </div>

        {/*Main Content*/}
        <div className="flex-1 flex flex-col overflow-y-auto">

          <div className="flex flex-col gap-3 px-5 pt-2">
            <SearchBar setSearchQuery={setSearchQuery} />
          </div>

          <div className="flex-1 overflow-y-auto px-5 bg-white">
            <PostList posts={filteredPosts} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;
