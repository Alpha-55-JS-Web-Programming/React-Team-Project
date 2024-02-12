import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import { dislikePost, likePost } from '../../services/post.services';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import { db } from '../../config/firebase-config';
import { addCommentToPost } from '../../services/post.services';

/**
 *
 * @param {{ post: { id: string, title: string, content: string, createdOn: string, liked: boolean }, togglePostLike: function }} props
 */
export default function PostDetails({ post, togglePostLike }) {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  const addCommentToDatabase = (postId, comment) => {
    const commentsRef = db.ref(`posts/${id}/comments`);
    commentsRef.push(comment);
  };
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const commentData = {
        author: userData.handle, // Assuming userData contains the current user's data
        text: newComment,
        createdOn: new Date().valueOf() // Stores timestamp of the comment
      };
      addCommentToPost(post.id, commentData)
        .then(() => {
          setComments([...comments, commentData.text]); // Update local state to display the new comment
          setNewComment(''); // Clear the comment input field
        })
        .catch(error => console.error("Error adding comment:", error));
    }
  };
  

  
  const toggleLike = async () => {
    if (post.likedBy.includes(userData.handle)) {
      dislikePost(userData.handle, post.id);
    } else {
      likePost(userData.handle, post.id);
    }
    togglePostLike(userData.handle, post.id);
  };

 return (
    <div className="post">
      <h4>Author: {post.title}</h4>
      <p>Content: {post.content}</p>
      <p>Posted by: {post.authorDetails?.handle || 'Unknown'}</p> {/* Display author's handle */}
      <p>Date: {new Date(post.createdOnReadable).toLocaleDateString('bg-BG')}</p>
     

      <div>
        <h3>Comments:</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
        />
      <Button onClick= {handleAddComment} >Comment</Button>
      </div>
      <p>Likes: {post.likedBy.length}</p>

      <Button onClick={() => navigate('/allposts')} >Back</Button>
      <Button onClick={() => navigate('/allposts')} >Edit</Button>
      <Button onClick={() => navigate('/allposts')} >Delete</Button>
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
  }),
  togglePostLike: PropTypes.func,
};