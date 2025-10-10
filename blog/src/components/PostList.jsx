import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import SearchBar from "./SearchBar";

const PostList = ({ posts, userId }) => {
  const [filter, setFilter] = useState("All");
  const [filteredPosts, setFilteredPost] = useState(posts);

  useEffect(() =>{
    if(filter === "my"){
      setFilteredPost(posts.filter((p) => Number(p.userId) === Number(userId)));
    }else{
      setFilteredPost(posts);
    }
  }, [filter, posts, userId]);

  if (!filteredPosts || filteredPosts.length === 0)
    return <p className="text-center pt-5">No posts available.</p>;

  return (
    <div className="flex flex-col w-full bg-white border border-gray-200 shadow-md py-4 rounded-lg px-5 mt-3">
      <div className="flex gap-3 border-b-2 border-gray-300 ">
        <span 
          onClick={() => setFilter("all")}
          className="text-black cursor-pointer hover:border-b-3 hover:border-black">All Announcement
        </span>
        <span className="text-black cursor-pointer hover:border-b-3 hover:border-black">My Announcement</span>
      </div>

      <div className="flex flex-col gap-4 mt-3 max-h-[760px] overflow-y-auto">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>



    </div>
  );
};

export default PostList;
