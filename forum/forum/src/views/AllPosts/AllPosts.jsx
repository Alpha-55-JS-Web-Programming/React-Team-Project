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
    console.log({ posts });

    let sorted;
    switch (sortBy) {
      case "choose-sort":
        return setSortedPosts(posts);
        case "most-liked":
          sorted = [...posts].sort((a, b) => b.likedBy.length - a.likedBy.length);
          return setSortedPosts(sorted);
          case "most-commented":
            sorted = Object.keys(posts).sort((a, b) => {
                // Check if comments property exists for both posts
                const commentsA = posts[a].comments ? Object.keys(posts[a].comments).length : 0;
                const commentsB = posts[b].comments ? Object.keys(posts[b].comments).length : 0;
                // Compare by the number of comments
                return commentsB - commentsA;
            });
            // Convert the sorted keys back to an array of post objects
            return setSortedPosts(sorted.map(postKey => posts[postKey]));
            
          case "newest":
              sorted = [...posts].sort((a, b) => new Date(b.createdOnReadable) - new Date(a.createdOnReadable));
              return setSortedPosts(sorted);
    }
    // Convert the sorted keys back to an array of post objects
    // setSortedPosts(sorted.map(postKey => posts[postKey]));
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
        sortPosts("choose-sort"); // Default sort
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredPosts = posts.filter(post => post.title && post.title.toLowerCase().includes(search.toLowerCase()));
    setSortedPosts(filteredPosts);
  }, [posts, search]);


  const togglePostLike = (handle, postId) => {
    const postIndex = posts.findIndex((post) => post.id === postId);
    const post = posts[postIndex];
  
    if (post.likedBy.includes(handle)) {
      dislikePost(handle, postId).then(() => {
        const updatedPosts = [...posts];
        updatedPosts[postIndex] = {
          ...post,
          likedBy: post.likedBy.filter((u) => u !== handle),
        };
  
        setPosts(updatedPosts);
      });
    } else {
      likePost(handle, postId).then(() => {
        const updatedPosts = [...posts];
        updatedPosts[postIndex] = {
          ...post,
          likedBy: [...post.likedBy, handle],
        };
  
        setPosts(updatedPosts);
      });
    }
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
  {post.likedBy.includes(userData.handle) ? "Dislike" : "Like"}
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
