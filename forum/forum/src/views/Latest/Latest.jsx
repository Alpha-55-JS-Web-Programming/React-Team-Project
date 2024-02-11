import { db } from '../../config/firebase-config';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

export default function Latest() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      const collectionRef = collection(db, `posts/`);
      const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push(doc.data());
      });
      setPosts(postsData);
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
