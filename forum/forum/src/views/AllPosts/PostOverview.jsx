import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import { dislikePost, likePost } from '../../services/post.services';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../services/post.services";
import PostOverview from "./PostOverview";
import { useSearchParams } from "react-router-dom";
import Sort from "../../components/Sort/Sort";

/**
 *
 * @param {{ post: { id: string, title: string, content: string, createdOn: string, liked: boolean }, togglePostLike: function }} props
 */
export default function PostOverview() {
  const { userData } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getAllPosts().then((posts) => setPosts(posts));
  }, []);

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
    <div>  
      <Sort />

      <label htmlFor="search">Search </label>
      <input value={search} onChange={e => setSearch(e.target.value)} type="text" name="search" id="search" className="input-css" />

      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post.id}>
            <h3>Title: {post.title}</h3>
            <p><strong>Context:</strong> {post.content}</p>
            <p>{new Date(post.createdOnReadable).toLocaleDateString('bg-BG')}</p>
            <Button onClick={() => togglePostLike(post.id)}>
              {post.likedBy.includes(userData.handle) ? 'Dislike' : 'Like'}
            </Button>
            <Button onClick={() => navigate(`/posts/${post.id}`)}>Details</Button>
          </div>
        ))}
      </div>
  );
}

PostOverview.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    createdOn: PropTypes.string,
    likedBy: PropTypes.array,
  }),
  togglePostLike: PropTypes.func,
};