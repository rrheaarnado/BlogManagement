import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { api } from "../api";
import Comment from "../components/Comment";
import ActionMenu from "../components/ActionMenu";
import StatusModal from "../components/StatusModal";


const PostDetails = () => {
  const { id } = useParams(); // get post ID from URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const currentUser = { userId: auth?.userId, username: auth?.username };

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success"
  });


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await api.getPost(id); // fetch post from backend
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

  const handleDeletePost = async (postId) => {
    try {
      await api.deletePost(postId);

      setModal({
        isOpen: true,
        status: "error",
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

      console.log("Failed to delete post", err);
      setModal({
        isOpen: true,
        status: "success",
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
        
         {/* Post Container */}
        <div className="w-full max-w-5xl border-b-1 px-4 py-4 border-gray-300 shadow">
          {/* User Info */}
          {/* User Info */}
          <div className="mb-2 flex justify-between">
            <div>
              <span className="font-semibold text-lg">{post.username || post.user?.username || "Unknown"}</span>
              <span className="text-sm text-gray-500 ml-2">
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleString()
                  : "Unknown date"}

              </span>
            </div>
            {/* Reusable ActionMenu for Post */}
            <ActionMenu
              actions={[
                { label: "Edit", onClick: () => console.log("Edit Post", post.id) },
                ...(post.userId === currentUser?.userId
                  ? [
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

          {/* Post Title */}
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>

          {/* Post Content */}
          {/* Content */}
          <div
            className="mt-2 overflow-hidden mt-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>
      </div>

      {/* Comments Container */}
      <Comment postId={Number(post.id)} currentUser={currentUser} />



      <StatusModal
        isOpen={modal.isOpen}
        type={modal.status}
        title={modal.title}
        message={modal.message}
        onClose={() => setModal({ ...modal, isOpen: false })}
      />

    </div>
  );
};

export default PostDetails;
