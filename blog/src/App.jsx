import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { api } from "./api";

console.log("API client loaded:", api);

export default function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch all Users
    api.getUsers().then(setUsers).catch(console.error);

    // Fetch all Posts
    api.getPosts().then(setPosts).catch(console.error);

    // Fetch all Comments
    api.getComments().then(setComments).catch(console.error);
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Simple API Frontend</h1>

      {/* Users */}
      <section>
        <h2>Users</h2>
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              <strong>{u.name}</strong> ({u.email})
            </li>
          ))}
        </ul>
      </section>

      {/* Posts */}
      <section>
        <h2>Posts</h2>
        <ul>
          {posts.map((p) => (
            <li key={p.id}>
              <strong>{p.title}</strong> – {p.content}
            </li>
          ))}
        </ul>
      </section>

      {/* Comments */}
      <section>
        <h2>Comments</h2>
        <ul>
          {comments.map((c) => (
            <li key={c.id}>
              {c.text} (by user {c.userId} on post {c.postId})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

