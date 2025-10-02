import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, fullWidth = false }) => {
  if (!posts || posts.length === 0)
    return <p className="text-center">No posts available.</p>;

  return (
    <div className="flex flex-col gap-2 w-full">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} fullWidth={fullWidth} />
      ))}
    </div>
  );
};

export default PostList;
  