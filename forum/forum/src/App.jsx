import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./config/firebase-config";
import "./App.css";
import NotFound from "./views/NotFound/NotFound";
import Trending from "./views/Trending/Trending";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Header from "./components/Header/Header";
import CreatePost from "./views/CreatePost/CreatePost";
import { AppContext } from "./Context/AppContext";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home/Home";
import SinglePost from "./views/SinglePost/SinglePost";
import Authenticated from "./hoc/Authenticated";
import { auth } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData } from "./services/users.service";
import ProfileInformation from "./views/ProfileInformation/ProfileInformation";
import Admin from "./views/Admin/Admin";
import ProfileUpdate from "./views/ProfileInformation/ProfileUpdate";
import TopBarProgress from 'react-topbar-progress-indicator';


function App() {
  const [context, setContext] = useState({
    user: null,
    userData: null,
  });
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      getUserData(user.uid)
        .then(snapshot => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            setContext({ user, userData: snapshot.val()[Object.keys(snapshot.val())[0]] });
          }
        })
    }
  }, [user]);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ ...context, setContext }}>
        <Header />

        <LoadRoutes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/home" element={<Home />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/create-post" element={<Authenticated><CreatePost /></Authenticated>} />
          <Route path="/profile-information" element={<Authenticated><ProfileInformation /></Authenticated>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/update-profile" element={<Authenticated><ProfileUpdate /></Authenticated>} />
          <Route path="*" element={<NotFound />} />
          </LoadRoutes>
        <Footer />
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;

function LoadRoutes({ children }) {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState('');
  const location = useLocation();
  TopBarProgress.config({
    barColors: {
      0: '#4287f5',
      1: '#1861d6'
    },
    barThickness: 3.5,
    shadowBlur: 0
  });
  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc('');
    }
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);
  return (
    <>
      {progress && <TopBarProgress />}
      <Routes>{children}</Routes>
    </>
  );
}