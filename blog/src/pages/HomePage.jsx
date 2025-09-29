import Header from "../components/Header";
import PostList from "../components/PostList";
import BottomInputBar from "../components/BottomInputBar";
import Sidebar from "../components/Sidebar";
import { api } from "../api";
import { useEffect, useState } from "react";


function HomePage() {
  const [posts, setPosts] = useState([]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  // Add new post
  const handleAddPost = async ({ title, content }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Please login first");

    const post = {
      title,
      content,
      isPublished: true, // or false if draft
      userId: user.userId // pass the user ID here
    };

    try {
      const createdPost = await api.createPost(post);
      setPosts(prev => [createdPost, ...prev]);
    } catch (err) {
      console.error("Failed to add post:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 mt-4">
        {/* Sidebar */}
        <div className="w-20 flex-shrink-0 sticky top-20 h-[calc(100vh-80px)] p-5 ml-5">
          <Sidebar />
        </div>

        {/* Post list and input */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <PostList posts={posts} />
          </div>

          <div className="p-4">
            <BottomInputBar onAdd={handleAddPost} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
