import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useSearchParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { getAllPosts, dislikePost, likePost } from "../../services/post.services";
import { AppContext } from "../../Context/AppContext";
import Sort from "../../components/Sort/Sort";
import "./AllPosts.css";

export default function AllPosts() {
  const { userData } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedPosts, setSortedPosts] = useState([]);
  const [search, setSearch] = useState(""); // Updated to use local state for search
  const navigate = useNavigate();

  const sortPosts = (sortBy) => {
    let sorted;
    switch (sortBy) {
      case "most-liked":
        sorted = [...posts].sort((a, b) => b.likedBy.length - a.likedBy.length);
        break;
      case "most-commented":
        sorted = [...posts].sort((a, b) => b.comments.length - a.comments.length);
        break;
      default:
        sorted = [...posts].sort((a, b) => new Date(b.createdOnReadable) - new Date(a.createdOnReadable));
        break;
    }
    setSortedPosts(sorted);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSearchParams({ search: value });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
        sortPosts("newest"); // Default sort
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
    setSortedPosts(filteredPosts);
  }, [posts, search]);

  const togglePostLike = (handle, id) => {
    setSortedPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === id) {
          post.likedBy = post.likedBy.includes(handle)
            ? post.likedBy.filter((u) => u !== handle)
            : [...post.likedBy, handle];
        }
        return post;
      })
    );
  };

  return (
    <div className="all-posts-container">
      <h1>All posts</h1>

      <div className="sort-search-container">
        <Sort onSortChange={sortPosts} />

        <label htmlFor="search">Search </label>
        <input
          value={search}
          onChange={handleSearchChange}
          type="text"
          name="search"
          id="search"
          className="input-css"
        />
      </div>

      {sortedPosts.map((post) => (
        <div key={post.id}>
          <h3>Title: {post.title}</h3>
          <p> <strong>Context:</strong> {post.content} </p>
          <p>{new Date(post.createdOnReadable).toLocaleDateString("bg-BG")}</p>
          <Button onClick={() => togglePostLike(userData.handle, post.id)}>
            {" "}{post.likedBy.includes(userData.handle) ? "Dislike" : "Like"}{" "}
          </Button>
          <Button onClick={() => navigate(`/posts/${post.id}`)}>
            {" "}Details{" "}
          </Button>
        </div>
      ))}
    </div>
  );
}

AllPosts.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    createdOn: PropTypes.string,
    likedBy: PropTypes.array,
  }),
  togglePostLike: PropTypes.func,
};
