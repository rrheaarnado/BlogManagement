import React from "react";
import { Link } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


const PostItem = ({ post, user }) => {
  return (
    <div className="w-2/3 mx-auto rounded-lg shadow-lg mt-3 p-4 mb-4 bg-white text-black border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{post.username || post.user?.username || "Unknown"}</span>

        <span className="text-sm text-gray-500">
           {post.createdAt
                      ? new Date(post.createdAt).toLocaleString()
                      : "Unknown date"}

        </span>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold">{post.title}</h2>

      {/* Content */}
      <p className="mt-2">{post.content}</p>

      <div className="flex justify-between text-sm mt-10 font-semibold">
        <p className="hover:underline">
          <Link to={`/posts/${post.id}`} className="hover:underline">
            View Announcement
          </Link>
        </p>

        <p className="hover:underline">
          <Link to={`/posts/${post.id}`} className="hover:underline">
            Comments
          </Link>{" "}
          <span className="text-gray-400 font-normal">(
            {post.comments?.length === 0
              ? "No Comment"
              : post.comments?.length === 1
                ? "1 Comment"
                : `${post.comments.length} Comments`})
          </span>
        </p>


      </div>
    </div>
  );
};

export default PostItem;
