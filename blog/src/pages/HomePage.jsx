// src/HomePage.jsx
import React from "react";
import { api } from "../api";
import { useState, useEffect } from 'react'


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

 
}