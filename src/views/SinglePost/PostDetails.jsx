import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { addCommentToPost, deletePost } from "../../services/post.services";
import "./PostDetails.css";
import { db } from "../../config/firebase-config";
import { ref, update } from "firebase/database";

export default function PostDetails({ post, togglePostLike, updatePost }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userData } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editedContent, setEditedContent] = useState(post.content);
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState('');

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
      await deletePost(post.id);
      navigate("/home");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdatePost = async () => {
    try {
      const postRef = ref(db, `posts/${post.id}`);
      await update(postRef, { content: editedContent });
      console.log('Post updated successfully');
      setUpdateSuccessMessage('Post updated successfully!');
      setTimeout(() => setUpdateSuccessMessage(''), 3000);
      setIsEditing(false);

      const updatedPost = { ...post, content: editedContent };
      updatePost(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleBack = () => {
    if (location.state?.from === 'trending') {
      navigate('/trending');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="post-details">
      <h2 className="post-details-title">{post.title}</h2>
      {updateSuccessMessage && <div className="success-message">{updateSuccessMessage}</div>}
      {isEditing ? (
        <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
      ) : (
        <p className="post-content">{post.content}</p>
      )}
      <p className="post-meta"> Posted by: {post.authorDetails?.handle || "Unknown"} |  Date:{" "} {new Date(post.createdOnReadable).toLocaleDateString("bg-BG")} </p>
      <Button onClick={() => togglePostLike(userData.handle, post.id)}> {post.likedBy.includes(userData.handle) ? "Dislike" : "Like"} </Button>
      <div className="comment-section">
      <p>Likes: {post.likedBy.length}</p>
        <div>
          {userData.isBlocked ? (
            <h3>You don't have permission to comment.</h3>
          ) : (
            <>
              {isEditing ? (
                <textarea value={newComment} onChange={handleCommentChange} placeholder="Add a comment..." disabled />
              ) : (
                <textarea value={newComment} onChange={handleCommentChange} placeholder="Add a comment..." />
              )}
              <Button onClick={handleAddComment}>Comment</Button>
            </>
          )}
        </div>
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
            <p> {comment.author}: {comment.text} </p>
          </div>
        ))}
      </div>

      <div className="button-group">
        <Button onClick={handleBack}>Back</Button>
        {(userData.handle === post.author || userData.role === "admin") && (
          <>
            <Button onClick={() => setIsEditing(!isEditing)}> {isEditing ? "Cancel" : "Edit"} </Button>
            {isEditing && (
              <Button onClick={handleUpdatePost}>Update Post</Button>
            )}
          </>
        )}
        {(userData.handle === post.author || userData.role === "admin") && (
          <Button onClick={handleDeletePost}>Delete</Button>
        )}
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