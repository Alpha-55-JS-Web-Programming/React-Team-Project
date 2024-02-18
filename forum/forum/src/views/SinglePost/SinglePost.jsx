import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/post.services";
import PostDetails from "./PostDetails";
import { likePost, dislikePost } from "../../services/post.services";

export default function SinglePost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPostById(id).then(postData => {
      if (postData) {
        setPost(postData);
      }
    });
  }, [id]);

  const togglePostLike = (handle) => {
    if (post && post.likedBy.includes(handle)) {
      dislikePost(handle, post.id).then(() => {
        setPost(prevPost => ({
          ...prevPost,
          likedBy: prevPost.likedBy.filter(u => u !== handle),
        }));
      });
    } else {
      likePost(handle, post.id).then(() => {
        setPost(prevPost => ({
          ...prevPost,
          likedBy: [...prevPost.likedBy, handle],
        }));
      });
    }
  };

  return (
    <div>
      <h1>Single Post</h1>
      {post && <PostDetails post={post} togglePostLike={togglePostLike} updatePost={(updatedPost) => setPost(updatedPost)} />}
    </div>
  );
}
