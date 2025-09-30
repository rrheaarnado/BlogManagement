import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { api } from "../api";
import ActionMenu from "./ActionMenu";
import StatusModal from "./StatusModal";

const Comment = ({ postId, currentUser }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  });

  // Fetch comments
  const fetchComments = async () => {
    try {
      const data = await api.getCommentsByPost(postId);
      setComments(data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // Add comment
  const handleAddComment = async (e) => {
  e.preventDefault();
  if (!commentText.trim()) return; // prevent empty comment

  try {
    // Make sure the user is logged in
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth?.token) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Unauthorized",
        message: "You must be logged in to comment.",
      });
      return;
    }

    await api.createComment({ postId, content: commentText });


    setCommentText(""); // clear input
    fetchComments(); // refresh comments
  } catch (error) {
    console.error("Failed to add comment:", error);
    setModal({
      isOpen: true,
      type: "error",
      title: "Error",
      message: "Failed to add comment. Please try again.",
    });
  }
};


  // Delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      await api.deleteComment(commentId, currentUser.userId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setModal({
        isOpen: true,
        type: "success",
        title: "Success",
        message: "Comment deleted successfully!",
      });
    } catch (err) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to delete comment. Please try again.",
      });
    }
  };

  return (
    <div className="w-full flex justify-center mb-10">
      <div className="w-full max-w-5xl bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col">
        <h3 className="text-lg font-semibold mb-4">Comments</h3>

        {/* Comment List */}
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
          {comments.length === 0 && <p>No comments yet.</p>}

          {comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-3 flex justify-between items-start border-b border-gray-300 p-2 rounded-sm"
            >
              <div>
                <p className="text-md font-semibold flex items-center gap-2">
                  {comment.username || "Unknown"}
                  <span className="text-xs font-normal text-gray-500">
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleString()
                      : "Unknown date"}
                  </span>
                </p>
                <p className="text-gray-700 mt-2">{comment.content}</p>
              </div>

              {/* ActionMenu for edit/delete */}
              <ActionMenu
                actions={[
                  { label: "Edit", onClick: () => console.log("Edit", comment.id) },
                  ...(comment.userId === currentUser?.userId
                    ? [
                        {
                          label: "Delete",
                          onClick: () => handleDeleteComment(comment.id),
                          danger: true,
                        },
                      ]
                    : []),
                ]}
              />
            </div>
          ))}
        </div>

        {/* Add Comment Section */}
        <div className="mt-4 pt-4 flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black/70"
          >
            Comment
          </button>
        </div>

        {/* Status Modal */}
        <StatusModal
          isOpen={modal.isOpen}
          status={modal.type}
          message={modal.message}
          onClose={() => setModal({ ...modal, isOpen: false })}
        />
      </div>
    </div>
  );
};

export default Comment;
