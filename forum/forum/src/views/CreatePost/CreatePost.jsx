import React, { useContext, useState } from 'react';
import Button from '../../components/Button/Button';
import { addPost } from '../../services/post.services';
import { AppContext } from '../../Context/AppContext';
import './CreatePost.css';
import SortTags from '../../components/Sort/SortTags';

export default function CreatePost() {
  const { user, userData } = useContext(AppContext);
  const [post, setPost] = useState({
    title: '',
    content: '',
    tags: [], // Changed to an array to handle multiple tags, even though we're currently only using one
  });

  const updatePost = (value, key) => {
    setPost({
      ...post,
      [key]: value,
    });
  };

  // Handler for tag change from SortTags component
  const handleTagChange = (selectedTag) => {
    setPost({
      ...post,
      tags: selectedTag ? [selectedTag] : [], // Update the tags array with the selected tag or empty it if none is selected
    });
  };

  const createPost = async () => {
    if (post.title.length < 3) {
      return alert('Title must be at least 3 characters long');
    }
    if (post.content.length < 5 || post.content.length > 3000) {
      return alert('Content must be at least 5 characters long and maximum 3000 characters long');
    }

    await addPost(userData?.handle ?? 'test-user-id', post.title, post.content, post.tags);

    setPost({
      title: '',
      content: '',
      tags: [],
    });
  };

  return (
    <div>
      {userData.isBlocked ? (
        <h3>You don't have permission to access this page.</h3>
      ) : (
        <div className="create-post-container">
          <h1 className="h1">Create post</h1>
          <label htmlFor="input-title">Title:</label>
          <input value={post.title} onChange={(e) => updatePost(e.target.value, 'title')} type="text" name="input-title" id="input-title" /><br />
          <label htmlFor="input-content" className="label-css">Content:</label><br />
          <textarea value={post.content} onChange={(e) => updatePost(e.target.value, 'content')} name="input-content" id="input-content" cols="30" rows="10"></textarea><br /><br />
          <label>Tags:</label>
          <SortTags onSortChange={handleTagChange} /><br />
          <Button onClick={createPost} className="button">Create</Button>
        </div>
      )}
    </div>
  );
}
