import React, { useEffect, useRef, useState } from "react";
import { api } from "../api";
import ActionMenu from "./ActionMenu";
import StatusModal from "./StatusModal";

const Comment = ({ postId, currentUser }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  // Editing state
  const [isEditingId, setIsEditingId] = useState(null); // which comment is being edited (id or null)
  const [editData, setEditData] = useState({ content: "" });
  const editableRef = useRef(null);

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  });

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };


  // Fetch comments
  const fetchComments = async () => {
    try {
      const data = await api.getCommentsByPost(postId);
      console.log("Fetched comments:", data);
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
    if (!commentText.trim()) return;

    try {
      await api.createComment({ postId, content: commentText });
      setCommentText("");
      fetchComments();
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

  // Start editing a comment
  const handleEditComment = (comment) => {
    setIsEditingId(comment.id);
    setEditData({ content: comment.content });
    setTimeout(() => {
      if (editableRef.current) {
        editableRef.current.innerHTML = comment.content;
      }
    }, 0);
  };

  // Save edited comment
  const handleSaveEdit = async () => {

    if (!stripHtml(editData.content).trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Comment cannot be empty.",
      });
      return;
    }

    try {
      await api.updateComment(isEditingId, { content: editData.content });

      setComments((prev) =>
        prev.map((c) =>
          c.id === isEditingId
            ? { ...c, content: editData.content, updatedAt: new Date().toISOString() }
            : c
        )
      );

      setIsEditingId(null);
      setModal({
        isOpen: true,
        type: "success",
        title: "Success",
        message: "Comment updated successfully!",
      });
    } catch (err) {
      console.error("Failed to update comment", err);
      setModal({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to update comment. Please try again.",
      });
    }

    await fetchComments();
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditingId(null);
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
              className="mb-3 flex justify-between justify-center items-end border-b border-gray-300 p-2 rounded-sm"
            >
              <div className="flex-1">
                <p className="text-md font-semibold flex items-center gap-2">
                  {comment.username || "Unknown"}
                  <span className="text-xs font-normal text-gray-500">
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleString()
                      : "Unknown date"}
                  </span>

                  {/* Updated At */}
                  {comment.updatedAt &&
                    new Date(comment.updatedAt).getTime() > new Date(comment.createdAt).getTime() && (
                      <span className="text-xs font-normal text-gray-500 ">
                        (Last Edited: {new Date(comment.updatedAt).toLocaleString()})
                      </span>
                    )}
                </p>

                {isEditingId === comment.id ? (
                  <div
                    ref={editableRef}
                    contentEditable
                    suppressContentEditableWarning={true}
                    className="border border-gray-400 p-2 rounded mt-1 min-h-[60px] outline-none"
                    onInput={(e) =>
                      setEditData({ ...editData, content: e.currentTarget.innerHTML })
                    }
                  />
                ) : (
                  <p className="text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: comment.content }} />
                )}
              </div>

              {/* ActionMenu for edit/delete */}
              {comment.userId === currentUser?.userId && (
                <div className="flex flex-col items-end ml-4">
                  {isEditingId === comment.id ? (
                    <div className="flex flex-col gap-1 justify-center center-items">
                      <button
                        onClick={handleSaveEdit}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <ActionMenu
                      actions={[
                        {
                          label: "Edit",
                          onClick: () => handleEditComment(comment),
                          danger: false,
                        },
                        {
                          label: "Delete",
                          onClick: () => handleDeleteComment(comment.id),
                          danger: true,
                        },
                      ]}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Comment Section */}
        <form onSubmit={handleAddComment} className="mt-4 pt-4 flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isEditingId !== null} // disable new comment input while editing
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black/70"
            disabled={isEditingId !== null}
          >
            Comment
          </button>
        </form>

        {/* Status Modal */}
        <StatusModal
          isOpen={modal.isOpen}
          type={modal.type}
          title={modal.title}
          message={modal.message}
          onClose={() => setModal({ ...modal, isOpen: false })}
        />
      </div>
    </div>
  );
};

export default Comment;
