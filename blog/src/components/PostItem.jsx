import React, { useState } from "react";

const PostItem = ({ post, user }) => {
    const [showComments, setShowComments] = useState(false); // Track visibility

    return (
        <div className="w-2/3 mx-auto rounded-lg shadow-lg p-4 mb-4 bg-white text-black">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{user.username}</span>
                <span className="text-sm text-gray-500">
                    {post.CreatedAt.toLocaleString()}
                </span>
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold">{post.Title}</h2>

            {/* Content */}
            <p>{post.Content}</p>

            {/* Toggle Comments Button */}
            <button
                className="mt-3 text-sm text-black-500 hover:underline"
                onClick={() => setShowComments(!showComments)}
            >
                {showComments ? "Hide Comments" : "View Comments"}
            </button>

            {/* Comments */}
            {showComments && (
                <div className="mt-4 border-t pt-2">
                    <h3 className="font-semibold mb-2">Comments</h3>
                    {post.Comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="mb-2 flex justify-between items-start"
                        >
                            <div>
                                <span className="font-semibold">{comment.username}:</span>{" "}
                                {comment.content}
                                <div className="text-xs text-gray-500">
                                    {comment.createdAt
                                        ? new Date(comment.createdAt).toLocaleString()
                                        : ""}
                                </div>
                            </div>

                            <div className="flex flex-col items-end text-right">
                                <button className="text-black text-xl hover:text-gray-700">
                                    &#x2026;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <input
                type="text"
                placeholder="Add Comment..."
                className="w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black-300"
            />
        </div>
    );
};

export default PostItem;
