import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/post.services";
import PostDetails from "./PostDetails";
import { likePost, dislikePost } from "../../services/post.services";

export default function SinglePost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch post by ID, which now includes author details
    getPostById(id).then(postData => {
      if (postData) {
        setPost(postData);
      }
    });
  }, [id, post]);

  const togglePostLike = (handle) => {
    if (post.likedBy.includes(handle)) {
      dislikePost(handle, post.id).then(() => {
        setPost({
          ...post,
          likedBy: post.likedBy.filter(u => u !== handle),
        });
      });
    } else {
      likePost(handle, post.id).then(() => {
        setPost({
          ...post,
          likedBy: [...post.likedBy, handle],
        });
      });
    }
  };

  return (
    <div>
      <h1>Single Post</h1>
      {/* Pass the entire post object, which now includes authorDetails, to PostDetails */}
      {post && <PostDetails post={post} togglePostLike={togglePostLike} />}
    </div>
  );
}
