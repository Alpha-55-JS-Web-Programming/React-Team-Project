import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import { dislikePost, likePost } from '../../services/post.services';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';

/**
 *
 * @param {{ post: { id: string, title: string, content: string, createdOn: string, liked: boolean }, togglePostLike: function }} props
 */
export default function PostDetails({ post, togglePostLike }) {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

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
      <h4>{post.title} <Button onClick={toggleLike}>{post.likedBy.includes(userData?.handle) ? 'Dislike' : 'Like'}</Button></h4>
      <p>{post.content}</p>
      <p>{new Date(post.createdOn).toLocaleDateString('bg-BG')}</p>
        
      <Button onClick={() => navigate('/allposts')} >Back</Button>
      {/*  author and admin only */}
      <Button onClick={() => navigate('/allposts')} >Edit</Button>
      <Button onClick={() => navigate('/allposts')} >Delete</Button>

      <Button onClick={() => navigate('/allposts')} >Comment</Button>

    </div>
  )
}

PostDetails.propTypes = {
    post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    createdOn: PropTypes.string,
    likedBy: PropTypes.array,
  }),
  togglePostLike: PropTypes.func,
};