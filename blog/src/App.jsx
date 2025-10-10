import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PostDetails from "./pages/PostDetails";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage";
import NotificationPage from "./pages/NotificationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { api } from "./api"
import RegisterPage from "./pages/RegisterPage";
// console.log("API clinent loaded:", api);
// console.log("API BASE", import.meta.env.VITE_API_URL);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Login */}
        <Route
          path="/"
          element={
            <Layout showHeader={false} showSidebar={false} showInput={false}>
              <LoginPage />
            </Layout>
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <Layout showHeader={false} showSidebar={false} showInput={false}>
              <LoginPage />
            </Layout>
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={
            <Layout showHeader={false} showSidebar={false} showInput={false}>
              <RegisterPage />
            </Layout>
          }
        />

        {/* Home */}
        <Route
          path="/announcements"
          element={
            <ProtectedRoute>
              <Layout showHeader={false} showSidebar={true} showInput={false}>
                <HomePage />
              </Layout>
            </ProtectedRoute>
          } />

        {/* Post Detail */}
        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute>
              <Layout showHeader={false} showSidebar={true} showInput={false}>
                <PostDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout showHeader={false} showSidebar={true}  showInput={false}>
                
                <ProfilePage/>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>  
              <Layout showHeader={false} showSidebar={true} showInput={false}>
                <NotificationPage/>
              </Layout>
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
