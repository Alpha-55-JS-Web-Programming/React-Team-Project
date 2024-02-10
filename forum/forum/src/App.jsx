import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./config/firebase-config";
import "./App.css";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";
import Trending from "./views/Trending/Trending";
import Latest from "./views/Latest/Latest";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Header from "./components/Header/Header";
import CreatePost from "./views/CreatePost/CreatePost";
import { AppContext } from "./Context/AppContext"; //???
import Footer from "./components/Footer/Footer";
import AllPosts from "./views/AllPosts/AllPosts";
import SinglePost from "./views/SinglePost/SinglePost";

function App() {
  const [context, setContext] = useState({
    user: null,
    userData: null,
  });

  return (
    <BrowserRouter>
        <AppContext.Provider value={{ ...context, setContext }} />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Latest" element={<Latest />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/allposts" element={<AllPosts />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
