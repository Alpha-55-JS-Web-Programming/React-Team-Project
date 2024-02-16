import React, { useEffect, useState } from 'react';
import { getTopCommentedPosts, getMostRecentPosts } from '../../services/post.services';
import { useNavigate } from 'react-router-dom';

const Trending = () => {
  const [topCommentedPosts, setTopCommentedPosts] = useState([]);
  const [mostRecentPosts, setMostRecentPosts] = useState([]);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  
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

  const renderPost = (post) => (
    <div key={post.id} className="post-item">
      <h3>{post.title}</h3>
      <p>Author: {post.authorDetails?.handle || 'Unknown'}</p>
      <p>Created on: {new Date(post.createdOnReadable).toLocaleDateString('bg-BG')}</p>
      <p>{`Number of Likes: ${post.likedBy ? post.likedBy.length : 0}`}</p>
      <p>{`Number of Comments: ${post.comments ? post.comments.length : 0}`}</p>
      {/* Add any other information you want to display */}
    </div>
  );
  

  return (
    <div>
      <h2>Top 10 Most Commented Posts</h2>
      {topCommentedPosts.map(renderPost)}

      <h2>10 Most Recently Created Posts</h2>
      {mostRecentPosts.map(renderPost)}
    </div>
  );
};

export default Trending;