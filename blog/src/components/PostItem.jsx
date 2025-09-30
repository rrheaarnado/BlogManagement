import React from "react";
import { Link } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


const PostItem = ({ post, user }) => {
  
  return (
    <div className="w-2/3 mx-auto rounded-lg shadow-lg mt-3 p-4 mb-4 bg-white text-black border border-gray-100">
  
      {/* Title */}
      <h2 className="text-lg font-bold">{post.title}</h2>

      {/* Content */}
      <div
        className="mt-2 overflow-hidden line-clamp-3 mt-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      {/* Actions */}
      <div className="flex justify-between text-sm mt-6 font-semibold">
        {/* Read More link */}
        <p className="text-black-500 hover:underline">
          <Link to={`/posts/${post.id}`} className="hover:underline">
            Read More
          </Link>
        </p>

        {/* Comments */}
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
