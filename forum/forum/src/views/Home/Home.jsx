import { useEffect, useState } from 'react';
import { getUsersCount } from '../../services/users.service';
import { getPostsCount } from '../../services/post.services';

export default function Home() {
  const [usersCount, setUsersCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);

  useEffect(() => {
    // Fetch users count
    getUsersCount().then(count => setUsersCount(count));

    // Fetch posts count
    getPostsCount().then(count => setPostsCount(count));
  }, []);

  return (
    <div>
      <title>Home</title>
      <h1>Home</h1>
      <p>{`Number of users: ${usersCount}`}</p>
      <p>{`Number of posts: ${postsCount}`}</p>
      {/* Your existing content goes here */}
    </div>
  );
}