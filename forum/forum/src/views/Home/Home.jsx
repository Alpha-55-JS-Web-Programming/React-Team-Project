import { useEffect, useState } from "react";
import { getUsersCount } from "../../services/users.service";
import { getPostsCount } from "../../services/post.services";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";


export default function Home() {
  const [usersCount, setUsersCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users count
    getUsersCount().then((count) => setUsersCount(count));

    // Fetch posts count
    getPostsCount().then((count) => setPostsCount(count));
  }, []);

  return (
    <>
      <div >
        <title>{(document.title = "Home")}</title>
        <h1 className="home">Home</h1>
        <section>
          <p>{`Number of users: ${usersCount}`}</p>
          <p>{`Number of posts: ${postsCount}`}</p>
          <br /><br />
          {/* Your existing content goes here */}
        </section>
      </div>
      <button onClick={() => navigate("/health")} className="health">Health</button>
      <button onClick={() => navigate("/wellness")} className="wellness">Wellness</button>

      <div className="details">
      <h3>Getting Started</h3>
      <h3>Health and Weight Loss</h3>
      <h3>Food and Nutrition</h3>
      <h3>Fitness and Exercise</h3>
      <h3>Sleep, Mindfulness and Overall Wellness</h3>
      <h3>Success Stories</h3>
      <h3>Motivation and Support</h3>
      <h3>Challenges</h3>

      </div>
    </>
  );
}
