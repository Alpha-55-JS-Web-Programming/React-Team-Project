import { useEffect, useState } from 'react';
import { getUsersCount } from '../../services/users.service';
import { getPostsCount } from '../../services/post.services';
import './Home.css'
// import production from "../../../assets/chia.mp4";

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

  <video src={"https://vod-progressive.akamaized.net/exp=1707957764~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3995%2F18%2F469975113%2F2090407167.mp4~hmac=6a5bc1a01dfd0ca3c61916d8849292861a98ca9fc074f47b30517f605561fbf4/vimeo-prod-skyfire-std-us/01/3995/18/469975113/2090407167.mp4"} muted loop autoPlay></video>
</section>

    </div>
  );
}