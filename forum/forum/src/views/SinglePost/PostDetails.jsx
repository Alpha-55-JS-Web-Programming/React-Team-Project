import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { addCommentToPost, deletePost } from "../../services/post.services";
import "./PostDetails.css";
import { db } from "../../config/firebase-config";
import { ref, update } from "firebase/database";


export default function PostDetails({ post, togglePostLike }) {
  const navigate = useNavigate();
  const { user, userData } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editedContent, setEditedContent] = useState(post.content);
  const [isEditing, setIsEditing] = useState(false);

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
      navigate("/allposts");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdatePost = async () => {
    try {
      // Update the post content with the edited content
      const postRef = ref(db, `posts/${post.id}`);
      await update(postRef, {
        content: editedContent,
      });
      console.log('Post updated successfully');
      setIsEditing(false); // Exit editing mode after updating
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="post-details">
      <h2>{post.title}</h2>
      {isEditing ? (
        <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)}/>
      ) : (
        <p className="post-content">{post.content}</p>
      )}
      <p className="post-meta"> Posted by: {post.authorDetails?.handle || "Unknown"} |  Date:{" "} {new Date(post.createdOnReadable).toLocaleDateString("bg-BG")} </p>
      <Button onClick={() => togglePostLike(userData.handle, post.id)}> {post.likedBy.includes(userData.handle) ? "Dislike" : "Like"} </Button>
      <div className="comment-section">
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
      <p>Likes: {post.likedBy.length}</p>
      <div className="button-group">
        <Button onClick={() => navigate("/allposts")}>Back</Button>
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