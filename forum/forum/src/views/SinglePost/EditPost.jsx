import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../config/firebase-config';
import { ref, update, get } from 'firebase/database';

export const EditPost = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [newContent, setNewContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const postRef = ref(db, `posts/${postId}`);
    get(postRef).then((snapshot) => {
      if (snapshot.exists()) {
        const postData = snapshot.val();
        setPost(postData);
        setNewContent(postData.content); 
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error("Error getting document:", error);
    });
  }, [postId]);

  const handleInputChange = (e) => {
    setNewContent(e.target.value);
  };

  const handleUpdatePost = async () => {
    try {
      const postRef = ref(db, `posts/${postId}`);
      await update(postRef, {
        content: newContent,
      });
      console.log('Post updated successfully');
    } catch (error) {
      setError(error.message);
      console.error('Error updating post:', error);
    }
  };

  if (!post) {
    return <p>Loading post...</p>;
  }

  return (
    <div>
      <h2>Edit Post</h2>
      <textarea value={newContent} onChange={handleInputChange} />
      <button onClick={handleUpdatePost}>Update Post</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};
;