import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0)
    return <p className="text-center">No posts available.</p>;

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
