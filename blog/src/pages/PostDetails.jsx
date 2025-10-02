import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { api } from "../api";
import Comment from "../components/Comment";
import ActionMenu from "../components/ActionMenu";
import StatusModal from "../components/StatusModal";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Post Editing
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: "", content: "" });
  const editableRef = useRef(null);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const currentUser = { userId: auth?.userId, username: auth?.username };

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

  // Fetch Post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await api.getPost(id);
        setPost(data);
      } catch (err) {
        console.error("Failed to fetch post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <p className="text-center mt-6">Loading post...</p>;
  if (!post) return <p className="text-center mt-6">Post not found.</p>;

  // Start editing
  const handleEditPost = () => {

    setEditData({
      title: post.title,
      content: post.content,
    });
    setIsEditing(true);
    setTimeout(() => {
      if (editableRef.current) {
        editableRef.current.innerHTML = post.content;
      }
    }, 0);
  };

  // Save edit
  const handleSaveEdit = async () => {

    if (!stripHtml(editData.title).trim() || !stripHtml(editData.content).trim()) {
  setModal({
    isOpen: true,
    type: "error",
    title: "Validation Error",
    message: "Title and content cannot be empty.",
  });
  return;
}


    try {
      await api.updatePost(post.id, { title: editData.title, content: editData.content });

      setPost((prev) => ({
        ...prev,
        title: editData.title,
        content: editData.content,
      }));
      setIsEditing(false);
      setModal({
        isOpen: true,
        type: "success",
        title: "Success",
        message: "Post Edited Successfully!",
      });

    } catch (err) {
      console.error("Failed to update post", err);
      setModal({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to edit post. Please try again.",
      });
    }
  };

  // Delete post
  const handleDeletePost = async (postId) => {
    try {
      await api.deletePost(postId);
      setModal({
        isOpen: true,
        type: "success",
        title: "Success",
        message: "Post deleted successfully!",
      });
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      let message = "Failed to delete post. Please try again.";
      if (err.message.includes("403")) {
        message = "You are not allowed to delete this post.";
      }
      setModal({
        isOpen: true,
        type: "error",
        title: "Error",
        message,
      });
    }
  };

  return (
    <div className="w-full mt-6 px-4">
      {/* Back Arrow */}
      <button
        onClick={handleGoBack}
        className="flex items-center gap-1 mb-4 text-gray-700 hover:text-gray-900"
      >
        <FiArrowLeft className="w-6 h-6" /> Back
      </button>

      <div className="w-full flex justify-center mb-6">
        <div className="w-full max-w-5xl border-b-1 px-4 py-4 border-gray-300 shadow">
          <div className="mb-2 flex justify-between">

            {/* Header: Name, CreatedAt, UpdatedAt */}
            <div className="flex items-center">
              <span className="font-semibold text-lg">
                {post.username || post.user?.username || "Unknown"}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleString()
                  : "Unknown date"}
              </span>

              {post.updatedAt && new Date(post.updatedAt).getTime() !== new Date(post.createdAt).getTime() && (
                <span className="text-sm text-gray-500 ml-2">
                  (Last Edited: {new Date(post.updatedAt).toLocaleString()})
                </span>
              )}


            </div>

            <ActionMenu
              actions={[
                ...(post.userId === currentUser?.userId
                  ? [
                    {
                      label: "Edit",
                      onClick: () => handleEditPost(post.id),
                    },
                    {
                      label: "Delete",
                      onClick: () => handleDeletePost(post.id),
                      danger: true,
                    },
                  ]
                  : []),
              ]}
            />
          </div>

          {isEditing ? (
            <div className="space-y-3">
              {/* Title input */}
              <input
                className="border border-gray-400 p-2 w-full rounded"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />

              {/* Editable div */}
              <div
                ref={editableRef}
                contentEditable
                suppressContentEditableWarning={true}
                className="border border-gray-400 p-2 w-full min-h-40 outline-none rounded"
                onInput={(e) =>
                  setEditData({
                    ...editData,
                    content: e.currentTarget.innerHTML,
                  })
                }
              />

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <div
                className="mt-2 overflow-hidden mt-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </>
          )}
        </div>
      </div>

      {/* Comments */}
      <Comment postId={Number(post.id)} currentUser={currentUser} />

      <StatusModal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={() => setModal({ ...modal, isOpen: false })}
      />
    </div>
  );
};

export default PostDetails;
