import { db } from '../../config/firebase-config';
import React, { useEffect, useState } from 'react';
import { query,limitToLast, orderByChild } from 'firebase/database';

export default function Latest() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {

      const collectionRef = db.ref('posts').orderByChild('createdOn').limitToLast(10);
      collectionRef.on('value', (snapshot) => {
        const postsData = [];
        snapshot.forEach((childSnapshot) => {
          postsData.push(childSnapshot.val());
        });
        setPosts(postsData.reverse()); 
      });
      return () => collectionRef.off('value');
    };

    fetchLatestPosts();
  }, []);

  return (
    <>
      <title>Latest</title>
      <p>Top 10 Latest</p>
      
      {posts.map((post) => (
        <div key={post.createdOn}>
      <h4>{post.title} <Button onClick={toggleLike}>{post.likedBy.includes(userData?.handle) ? 'Dislike' : 'Like'}</Button></h4>
          <p>{post.content}</p>
          <p>{post.createdAt}</p>
          <p>{post.author}</p>
        </div>
      ))}
    </>
  );
}
