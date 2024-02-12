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
import Authenticated from "./hoc/Authenticated";
import { auth } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData } from "./services/users.service";
import ProfileInformation from "./views/ProfileInformation/ProfileInformation";
// import  Admin from "./views/Login/Admin";

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
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Latest" element={<Latest />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/allposts" element={<Authenticated><AllPosts /></Authenticated>} />
          <Route path="/posts/:id" element={<Authenticated><SinglePost /></Authenticated>} />
          <Route path="/create-post" element={<Authenticated><CreatePost /></Authenticated>} />
          <Route path="/profile-information" element={<Authenticated><ProfileInformation /></Authenticated>} />
          {/* <Route path="/admin" element={<Authenticated><Admin /></Authenticated>} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
