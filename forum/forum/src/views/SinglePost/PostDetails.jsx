import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { addCommentToPost, deletePost } from "../../services/post.services";
import "./PostDetails.css";

export default function PostDetails({ post, togglePostLike }) {
  const navigate = useNavigate();
  const { user, userData } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const commentData = {
        author: userData.handle,
        text: newComment,
        createdOn: new Date(post.createdOnReadable).toLocaleDateString("bg-BG"),
      };

      addCommentToPost(post.id, commentData)
        .then(() => {
          setComments([...comments, commentData]);
          setNewComment("");
        })
        .catch((error) => console.error("Error adding comment:", error));
    }
  };

  const handleDeletePost = async () => {
    try {
      // Assuming deletePost is an async function that deletes a post
      await deletePost(post.id);
      navigate("/allposts");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="post-details">
      <h2>{post.title}</h2>
      <p className="post-content">{post.content}</p>
      <p className="post-meta"> Posted by: {post.authorDetails?.handle || "Unknown"} 
      | Date:{" "} {new Date(post.createdOnReadable).toLocaleDateString("bg-BG")} </p>
      <Button onClick={() => togglePostLike(userData.handle, post.id)}> {post.likedBy.includes(userData.handle) ? "Dislike" : "Like"}</Button>

      <div className="comment-section">

        <div>
          {userData.isBlocked ? (
            <h3>You don't have permission to comment.</h3>
          ) : (
            <>
              <textarea value={newComment} onChange={handleCommentChange} placeholder="Add a comment..."/>
              <Button onClick={handleAddComment}>Comment</Button>
            </>
          )}
        </div>

        <div className="comments-list">
          <h3>Comments:</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}> {comment.author}: {comment.text}</li>
            ))}
          </ul>
        </div>

        <div className="post-comments">
          {post.comments && post.comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <p> {comment.author}: {comment.text} <Button>Reply</Button> </p>
              </div>
            ))}
        </div>
      </div>

      <p>Likes: {post.likedBy.length}</p>

      <div className="button-group">
        <Button onClick={() => navigate("/allposts")}>Back</Button>
        {(userData.handle === post.author || userData.role === "admin" ) && ( <Button onClick={() => navigate("/allposts")}>Edit</Button> )}
        {(userData.handle === post.author || userData.role === "admin" )  && ( <Button onClick={handleDeletePost}>Delete</Button> )}
      </div>
    </div>
  );
}

PostDetails.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    createdOn: PropTypes.string,
    likedBy: PropTypes.array,
    authorDetails: PropTypes.object,
    comments: PropTypes.array,
  }),
  togglePostLike: PropTypes.func,
};
