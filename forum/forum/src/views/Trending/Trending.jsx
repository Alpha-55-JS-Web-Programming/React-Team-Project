import React, { useEffect, useState } from 'react';
import { getTopCommentedPosts, getMostRecentPosts } from '../../services/post.services';
import { useNavigate } from 'react-router-dom';
import './Trending.css';

const Trending = () => {
  const [topCommentedPosts, setTopCommentedPosts] = useState([]);
  const [mostRecentPosts, setMostRecentPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopCommentedPosts = async () => {
      const posts = await getTopCommentedPosts();
      console.log(posts);
      setTopCommentedPosts(posts);
    };

    const fetchMostRecentPosts = async () => {
      const posts = await getMostRecentPosts();
      console.log(posts);
      setMostRecentPosts(posts);
    };

    fetchTopCommentedPosts();
    fetchMostRecentPosts();
  }, []);

  // Correct approach to include key prop
  const renderPost = (post) => (
    <div className="post-item">
      <h3>{post.title}</h3>
      <p>{`Author: ${post.author}`}</p>
      <p>Created on: {new Date(post.createdOnReadable).toLocaleDateString('bg-BG')}</p>
      <p>{`Number of Likes: ${post.likedBy ? Object.keys(post.likedBy).length : 0}`}</p>
      <p>{`Number of Comments: ${post.comments ? Object.keys(post.comments).length : 0}`}</p>
    </div>
  );

  // Now map with key prop at the correct location
  return (
    <>
    <div className="first">
      <h2>Top 10 Most Commented Posts</h2>
      {topCommentedPosts.map(post => (
        <React.Fragment key={post.id}>
          {renderPost(post)}
        </React.Fragment>
      ))}
      </div>
      <div className="second">
      <h2>10 Most Recently Created Posts</h2>
      {mostRecentPosts.map(post => (
        <React.Fragment key={post.id}>
          {renderPost(post)}
        </React.Fragment>
      ))}
    </div>
    </>
  );
};

export default Trending;