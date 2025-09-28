import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PostDetails from "./components/PostDetails";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { api } from "./api";


// console.log("API clinent loaded:", api);
// console.log("API BASE", import.meta.env.VITE_API_URL);

const samplePosts = [
  {
    id: 1,
    title: "My First Post",
    content: "This is the content of my first post...",
    comments: [
      { id: 1, username: "Alice", text: "Nice post!" },
      { id: 2, username: "Bob", text: "Thanks for sharing." },
    ],
  },
  {
    id: 2,
    title: "Second Post",
    content: "More content here...",
    comments: [],
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={
            <Layout showHeader={false} showInput={false}>
              <LoginPage />
            </Layout>
          }
        />

        {/* Home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />

        {/* Post Detail */}
        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute>
              <Layout showHeader={true} showInput={false}>
                <PostDetails />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
