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

  {/* <video src='https://v3.cdnpk.net/videvo_files/video/free/video0467/large_watermarked/_import_61593b9f42edc5.23723719_preview.mp4' muted loop autoPlay></video> */}
  {/* <video src='https://www.shutterstock.com/shutterstock/videos/1106455887/preview/stock-footage-women-supporting-women-portrait-of-happy-female-runners-participating-in-a-marathon-group-of.webm' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/397941196.sd.mp4?s=db5404e0375233f2a67983972c6ea8b536708ff9&profile_id=164&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/456090858.sd.mp4?s=f04be0a292e37b0a1e94524f927c0433e1a7cd89&profile_id=164&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/progressive_redirect/playback/697837673/rendition/360p?loc=external&oauth2_token_id=57447761&signature=59943f3ed3c6c5d3acf8d6bf48112de10610c818e05282113ea05de835a93110' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/progressive_redirect/playback/720700664/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=32cd707c40bb4dc375cd31bf5acac6a1c292abf6b18909548079ad0dff9045f1' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/progressive_redirect/playback/720700926/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=233f0b2c8d07a34c09b53ccebab1a369bb003f23c0a7a98caa36b0925da70f34' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/487362247.sd.mp4?s=9c3b7f63fb824773a3477a8f4acfb90f5daecd22&profile_id=164&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/progressive_redirect/playback/895489373/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=764cbbf1884a33c4cfc31a5a549ecac6c8dc6179d9330800653a4fdee55ce930' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/525900429.sd.mp4?s=e09d162c1e1282e1aac061b7706418d685f86cf2&profile_id=164&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/525899818.sd.mp4?s=57ee9e2f24067797594ede61edd04dbc029bf5f4&profile_id=164&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/444527354.sd.mp4?s=3d960106cb31977cbb75b55fd33b220dd1e1719d&profile_id=164&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/567417001.sd.mp4?s=240dedadc7c2194c00eecec91207cd583ee76499&profile_id=164&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/368484050.sd.mp4?s=e5836460013a63181bcaea491d47fba7bacb3d55&profile_id=164&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/451461889.sd.mp4?s=d782d75e022b17833cd7d78e193a7305cde60913&profile_id=164&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/412609884.sd.mp4?s=1864f299f07e566d0f40628c14e1086478453aeb&profile_id=164&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/541575740.sd.mp4?s=95fdd67acb48606d5f531f062d40dce253b21d20&profile_id=164&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/597169224.sd.mp4?s=cf12104ce626b9efa521fa1cb3cd6cd59d4bd321&profile_id=164&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/488259466.sd.mp4?s=ef33788ddaac694c09423fafdfe42771219fdf90&profile_id=165&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/541721275.sd.mp4?s=fffc24a618c02497acdcec58ad531dcc6e386267&profile_id=164&oauth2_token_id=57447761' muted loop autoPlay></video> */}

  {/* <video src='https://player.vimeo.com/external/518737480.sd.mp4?s=81f8b1b71e4ad73e5cd1aa739319809966aca605&profile_id=165&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/518741182.sd.mp4?s=e1bdfd8d7baff06201967220461cd4aeecdd969c&profile_id=165&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  {/* <video src='https://player.vimeo.com/external/510988579.sd.mp4?s=f2e1694cb4c53da6f1da8bb7d9d9354c8ea47fa3&profile_id=164&oauth2_token_id=57447761' muted loop autoPlay></video> */}
  <video src='https://player.vimeo.com/external/518737096.sd.mp4?s=72f223985c1660a6f3d83dd8e68ea3adc0244f0f&profile_id=164&oauth2_token_id=57447761' muted loop autoPlay></video>



</section>

    </div>
  );
}