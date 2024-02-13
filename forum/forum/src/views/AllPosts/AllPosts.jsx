import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../services/post.services";
import PostOverview from "./PostOverview";
import { useSearchParams } from "react-router-dom";
import Sort from "../../components/Sort/Sort";
import "./AllPosts.css";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';

  const setSearch = (value) => {
    setSearchParams({ search: value });
  };

  useEffect(() => {
    getAllPosts(search).then(setPosts);
  }, [search]);

  const togglePostLike = (handle, id) => {
    setPosts(posts.map(t => {
      if (t.id === id) {
        t.likedBy = t.likedBy.includes(handle) ? t.likedBy.filter(u => u !== handle) : [...t.likedBy, handle];
      }
      return t;
    }));
  };

  return (
    <div className="all-posts-container">
      <h1>All posts</h1>

      <div className="sort-search-container">
        <Sort />

        <label htmlFor="search">Search </label>
        <input value={search} onChange={e => setSearch(e.target.value)} type="text" name="search" id="search" />
      </div>

      {posts.map((post) => (
        <PostOverview key={post.id} post={post} togglePostLike={togglePostLike} />
      ))}
    </div>
  );
}