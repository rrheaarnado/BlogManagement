import Header from "../components/Header";
import PostList from "../components/PostList";
import BottomInputBar from "../components/BottomInputBar";
import Sidebar from "../components/Sidebar";
import { api } from "../api";
import { useEffect, useState } from "react";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth?.userId) return alert("Please login first");

  const userId = auth.userId;

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
    if (!user) return alert("Please login first");

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

  // Filter posts based on selected filter
  const filteredPosts = posts
    .filter(p => (filter === "my" ? Number(p.userId) === Number(userId) : true))
    .filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <div className="">
          <Sidebar onFilterChange={setFilter} />
        </div>

        {/* Post list and input */}
        <div className="flex-1 flex flex-col mt-3">
          <div>
            <h2 className="font-bold ml-65">
              {filter === "all" ? "All Announcements" : "My Announcements"}
              <span className="text-gray-400 text-sm font-normal ml-1">
                ({filter === "all" ? posts.length : filteredPosts.length})
              </span>
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            <PostList posts={filteredPosts} />
          </div>

          <div className="p-4">
            <BottomInputBar
              onAdd={handleAddPost}
              onSearch={(searchTerm) => setSearch(searchTerm)}
            />

          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
