const BASE_URL = import.meta.env.VITE_API_URL; //gets BASE_URL from env.

async function http(path, options = {}) {
  // Get token from localStorage if available
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // add token if exists
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} – ${text}`);
  }

  try {
    return res.status === 204 ? null : await res.json();
  } catch {
    return null;
  }
}


export const api = {

    login: (credentials) =>
        http("/api/Auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        }),


    //Users
    getUsers: () => http("/api/Users"),
    getUser: (userId) => http(`/api/Users/${userId}`),
    createUser: (user) => http("/api/Users", { method: "POST", body: JSON.stringify(user) }),
    updateUser: (id, user) => http(`/api/Users/${id}`, { method: "PUT", body: JSON.stringify(user) }),
    deleteUser: (id) => http(`/api/Users/${id}`, { method: "DELETE" }),

    //Posts
    getPosts: () => http("/api/Posts"),
    getPost: (id) => http(`/api/Posts/${id}`),
    createPost: (post) => http("/api/Posts", { method: "POST", body: JSON.stringify(post) }),
    updatePost: (id, post) => http(`/api/Posts/${id}`, { method: "PUT", body: JSON.stringify(post) }),
    deletePost: (id, userId) =>
        http(`/api/Posts/${id}?userId=${userId}`, { method: "DELETE" }),

    //Comments
    getCommentsByPost: (postId) => http(`/api/comments/post/${postId}`),
    getComments: () => http("/api/Comments"),
    getComment: (id) => http(`/api/Comment/${id}`),
    createComment: (comment) => http("/api/Comments", { method: "POST", body: JSON.stringify(comment) }),
    updateComment: (id, comment) => http(`/api/Comments/${id}`, { method: "PUT", body: JSON.stringify(comment) }),
    deleteComment: (id, userId) =>
        http(`/api/Comments/${id}?userId=${userId}`, { method: "DELETE" }),


};
