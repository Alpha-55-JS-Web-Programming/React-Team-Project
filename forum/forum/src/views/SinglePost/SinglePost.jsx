import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/post.services";
import PostDetails from "./PostDetails";


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
  }, [id]);

  const togglePostLike = (handle) => {
    setPost({
      ...post,
      likedBy: post.likedBy.includes(handle) ? post.likedBy.filter(u => u !== handle) : [...post.likedBy, handle],
    });
  };

  return (
    <div>
      <h1>Single Post</h1>
      {/* Pass the entire post object, which now includes authorDetails, to PostDetails */}
      {post && <PostDetails post={post} togglePostLike={togglePostLike} />}
    </div>
  );
}
