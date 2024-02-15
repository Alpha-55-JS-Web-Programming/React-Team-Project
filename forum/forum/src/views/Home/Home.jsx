import { useEffect, useState } from 'react';
import { getUsersCount } from '../../services/users.service';
import { getPostsCount } from '../../services/post.services';
import './Home.css'
// import production from "../../../assets/production.mp4";

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
    <div className="showcase">
      <title>{document.title='Home'}</title>
      <h1>Home</h1>
    <section>
      <p>{`Number of users: ${usersCount}`}</p>
      <p>{`Number of posts: ${postsCount}`}</p>
      {/* Your existing content goes here */}

  <video src='https://v3.cdnpk.net/videvo_files/video/free/video0467/large_watermarked/_import_61593b9f42edc5.23723719_preview.mp4' muted loop autoPlay></video>
</section>

    </div>
  );
}