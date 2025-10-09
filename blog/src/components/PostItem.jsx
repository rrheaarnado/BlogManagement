import React from "react";
import { Link } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


const PostItem = ({ post, user, fullWidth = false }) => {
  return (
    <div className={`w-full rounded-lg shadow-md p-4 bg-white text-black border border-gray-300`}>
      {/* Header: Title and Time */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-bold">{post.title}</h2>
        <span className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>

      <div
        className="mt-2 overflow-hidden line-clamp-3 mt-5"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      <div className="flex justify-between text-sm mt-2 font-semibold">
        <p className="text-black-500 hover:underline">
          <Link to={`/posts/${post.id}`} className="hover:underline">
            Read More
          </Link>
        </p>

        <p className="hover:underline">
          <Link to={`/posts/${post.id}`} className="hover:underline">
            Comments{" "}
            <span className="text-gray-400 font-normal">(
              {post.comments?.length === 0
                ? "No Comment"
                : post.comments?.length === 1
                  ? "1 Comment"
                  : `${post.comments.length} Comments`})
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PostItem;
