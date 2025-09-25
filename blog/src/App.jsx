import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import PostItem from './components/PostItem';
import LoginPage from './pages/LoginPage';
import BottomInputBar from "./components/BottomInputBar";
import PostList from './components/PostList';

function AppWrapper() {
  const location = useLocation();
  const showLayout = location.pathname !== "/"; // Hide on login

  const handleAddItem = (item) => {
    console.log("Add item:", item);
  };

  return (
    <>
      {showLayout && <Header />}
      <PostList/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        
      </Routes>

      {showLayout && <BottomInputBar onAdd={handleAddItem} />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;