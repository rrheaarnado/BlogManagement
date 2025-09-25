// PostList.jsx
import React from "react";
import PostItem from "./PostItem";

const PostList = () => {
    const posts = [
        {
            Id: 1,
            Title: "My First Post",
            Content: "This is the content of my first post...",
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
            Comments: [
                { id: 1, username: "Alice", content: "Nice post!" },
                { id: 2, username: "Bob", content: "Thanks for sharing." },
            ],
            user: { username: "JohnDoe" },
        },
        {
            Id: 2,
            Title: "My Second Post",
            Content: "Content of the second post goes here...",
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
            Comments: [
                { id: 3, username: "Charlie", content: "Great post!" },
            ],
            user: { username: "JaneDoe" },
        },

        {
            Id: 3,
            Title: "My Second Post",
            Content: "Content of the second post goes here...",
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
            Comments: [
                { id: 5, username: "Charlie", content: "Great post!" },
            ],
            user: { username: "JaneDoe" },
        },
        
         {
            Id: 4,
            Title: "My Second Post",
            Content: "Content of the second post goes here...",
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
            Comments: [
                { id: 5, username: "Charlie", content: "Great post!" },
            ],
            user: { username: "JaneDoe" },
        },

         {
            Id: 5,
            Title: "My Second Post",
            Content: "Content of the second post goes here...",
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
            Comments: [
                { id: 5, username: "Charlie", content: "Great post!" },
            ],
            user: { username: "JaneDoe" },
        },
        
         {
            Id: 6,
            Title: "My Second Post",
            Content: "Content of the second post goes here...",
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
            Comments: [
                { id: 5, username: "Charlie", content: "Great post!" },
            ],
            user: { username: "JaneDoe" },
        },
        
        
    ];

    return (
        <div>
            {posts.map((post) => (
                <PostItem key={post.Id} post={post} user={post.user} />
            ))}
        </div>
    );
};

export default PostList;
