import React from "react";
import PostItem from "./PostItem";
import SearchBar from "./SearchBar";

const PostList = ({ posts, fullWidth = false }) => {
  if (!posts || posts.length === 0)
    return <p className="text-center">No posts available.</p>;

  return (
    <div className="flex flex-col w-full bg-white border border-gray-200 shadow-md py-4 rounded-lg px-5 mt-3">
      <div className="flex gap-3 border-b-2 border-gray-300 ">
        <span className="text-black cursor-pointer hover:border-b-2 hover:border-black hover:bg-black">All Announcement</span>
        <span className="text-black cursor-pointer hover:border-b-2 hover:border-black">My Announcement</span>
      </div>

      <div className="flex flex-col gap-4 mt-3 max-h-[760px] overflow-y-auto">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} fullWidth={fullWidth} />
        ))}
      </div>



    </div>
  );
};

export default PostList;
