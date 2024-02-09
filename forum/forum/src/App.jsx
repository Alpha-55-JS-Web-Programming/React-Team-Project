import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./views/Home/Home";
import { NotFound } from "./views/NotFound/NotFound";
import { Trending } from "./views/Trending/Trending";
import { Latest } from "./views/Latest/Latest";
import { Login } from "./views/Login/Login";
import { Register } from "./views/Register/Register";
import { Header } from "./components/Header/Header";
import { CreatePost } from "./views/CreatePost/CreatePost";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Latest" element={<Latest />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
