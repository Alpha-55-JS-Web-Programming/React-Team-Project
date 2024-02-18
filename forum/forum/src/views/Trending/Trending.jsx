import React, { useEffect, useState } from 'react';
import { getTopCommentedPosts, getMostRecentPosts } from '../../services/post.services';
import { useNavigate } from 'react-router-dom';
import './Trending.css';
import { dislikePost, likePost } from '../../services/post.services';

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

  const togglePostLike = async (handle, postId) => {
    const postIndex = topLikedPosts.findIndex((post) => post.id === postId);
    const post = topLikedPosts[postIndex];

    if (post.likedBy.includes(handle)) {
      // User already liked the post, so dislike it
      await dislikePost(handle, postId);
      const updatedPosts = [...topLikedPosts];
      updatedPosts[postIndex] = {
        ...post,
        likedBy: post.likedBy.filter((u) => u !== handle),
      };
      setTopLikedPosts(updatedPosts);
    } else {
      // User hasn't liked the post yet, so like it
      await likePost(handle, postId);
      const updatedPosts = [...topLikedPosts];
      updatedPosts[postIndex] = {
        ...post,
        likedBy: [...post.likedBy, handle],
      };
      setTopLikedPosts(updatedPosts);
    }
  };

  const renderPost = (post) => (
    <div key={post.id} className="all-posts">
      <div className="post-id">
        <div className="post-header">
          <h2 className="post-author">{post.author}</h2>
          <p className="post-created">{post.createdOnReadable}</p>
          <br />
          {post.tags?.length ? (
            <p className="post-tags"><strong>Tags:</strong> {post.tags?.join(", ")}</p>
          ) : null}
        </div>

        <div className="post-body">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-content"><strong>Context:</strong> {post.content}</p>
        </div>

        <div className="post-actions">
          <div className="like-section">
            <span className="material-symbols-outlined thumb-icon" onClick={() => togglePostLike("userHandle", post.id)}>
              {" "}thumb_up{" "} <span className="like-count"> {" "} {post.likedBy ? Object.keys(post.likedBy).length : 0} </span>
            </span>
          </div>
          <button onClick={() => navigate(`/posts/${post.id}`)} className="button-details"> Details </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <div >
      <h2 className="most-commented">Top 10 Most Commented Posts</h2>
      {topCommentedPosts.map(post => (
        <React.Fragment key={post.id}>
          {renderPost(post)}
        </React.Fragment>
      ))}
      </div>
      <div>
      <h2 className="most-recently">10 Most Recently Created Posts</h2>
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