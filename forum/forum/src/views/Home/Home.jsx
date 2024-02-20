import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getUsers, getAllPosts, dislikePost, likePost } from "../../services/post.services";
import { AppContext } from "../../Context/AppContext";
import Sort from "../../components/Sort/Sort";
import "./Home.css";
import { getUsersCount } from "../../services/users.service";
import { getPostsCount } from "../../services/post.services";

export default function Home() {
  const { userData } = useContext(AppContext);
  const [authors, setAuthors] = useState({});
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedPosts, setSortedPosts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [usersCount, setUsersCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);

  useEffect(() => {
    getUsersCount().then((count) => setUsersCount(count));
    getPostsCount().then((count) => setPostsCount(count));
  }, []);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    updateTags();
    loadAuthors();
  }, [posts]);

  useEffect(() => {
    applyPostsFilter();
  }, [posts, search, tags]);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
      sortPosts("choose-sort");
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const loadAuthors = async () => {
    const authors = await getUsers(posts.map(p => p.author));
    setAuthors((prevAuthors) => ({ ...prevAuthors, ...authors }));
  };

  const applyPostsFilter = () => {
    const filteredPosts = posts.filter((post) => {
      const selectedTagNames = tags
        .filter((t) => t.selected)
        .map((t) => t.name);
      const searchCriterion =
        !search || post.title?.toLowerCase().includes(search.toLowerCase());
      const tagsCriterion =
        !selectedTagNames.length ||
        post.tags?.some((t) => selectedTagNames.includes(t));
      return searchCriterion && tagsCriterion;
    });
    setSortedPosts(filteredPosts);
  };

  const sortPosts = (sortBy) => {
    console.log({ posts });

    let sorted;
    switch (sortBy) {
      case "choose-sort":
        return setSortedPosts(posts);
      case "most-liked":
        sorted = [...posts].sort((a, b) => b.likedBy.length - a.likedBy.length);
        return setSortedPosts(sorted);
      case "most-commented":
        sorted = Object.keys(posts).sort((a, b) => {
          const commentsA = posts[a].comments
            ? Object.keys(posts[a].comments).length
            : 0;
          const commentsB = posts[b].comments
            ? Object.keys(posts[b].comments).length
            : 0;
          return commentsB - commentsA;
        });
        return setSortedPosts(sorted.map((postKey) => posts[postKey]));
      case "newest":
        sorted = [...posts].sort(
          (a, b) =>
            new Date(b.createdOnReadable) - new Date(a.createdOnReadable)
        );
        return setSortedPosts(sorted);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSearchParams({ search: value });
  };

  const updateTags = () => {
    const uniqueTagNames = [
      ...new Set(posts.flatMap((post) => post.tags ?? []).filter(Boolean)),
    ];
    const tags = uniqueTagNames.map((name) => ({ name, selected: false }));
    setTags(tags);
  };

  const togglePostLike = (handle, postId) => {
    const postIndex = posts.findIndex((post) => post.id === postId);
    const post = posts[postIndex];

    if (post.likedBy.includes(handle)) {
      dislikePost(handle, postId).then(() => {
        const updatedPosts = [...posts];
        updatedPosts[postIndex] = {
          ...post,
          likedBy: post.likedBy.filter((u) => u !== handle),
        };

        setPosts(updatedPosts);
      });
    } else {
      likePost(handle, postId).then(() => {
        const updatedPosts = [...posts];
        updatedPosts[postIndex] = {
          ...post,
          likedBy: [...post.likedBy, handle],
        };

        setPosts(updatedPosts);
      });
    }
  };

  const handleTagSelect = (tag) => {
    const updatedTags = tags.map((t) =>
      t.name === tag.name ? { ...t, selected: !t.selected } : t
    );
    setTags(updatedTags);
  };

  return (
    <>
      <div className="content">
        <div>
          <title>{(document.title = "Home")}</title>
          <h1 className="home">Home</h1>
        </div>
        {/* <h1 className="all-postsi-title">All posts</h1> */}

        <div className="sort-search-container">
          <Sort onSortChange={sortPosts} className="sort" />
          <div className="search-bar">
            <span className="material-symbols-outlined">search</span>
            <input value={search} placeholder="Search" onChange={handleSearchChange} type="text" name="search" id="search" className="input-css" />
          </div>
        </div>

        <div className="together">
          <section className="usersCount">
            <p>{`Number of users: ${usersCount}`}</p>
            <br />
            <p>{`Number of posts: ${postsCount}`}</p>
            <br /><br />
          </section>
          <div className="tags-box">
            <p>Tags: </p>
            <div className="tags-container">
              {tags.map((tag, i) => (
                <span key={`tag-${i}`} className={`tag ${tag.selected ? "selected" : ""}`} onClick={() => handleTagSelect(tag)}>{tag.name}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="all-posts">
          {sortedPosts.map((post) => (
            <div key={post.id} className="post-id">

              <div className="post-header">
                <img className="post-author-avatar" src={authors[post.author]?.image ?? 'assets/default.png'} />
                <h2 className="post-author">{post.author}</h2>
                <p className="post-created">{post.createdOnReadable}</p>
                <br />
                {post.tags?.length ? (
                  <p className="post-tags"><strong>Tags: </strong> {post.tags?.join(", ")}</p>
                ) : null}
              </div>

              <div className="post-body">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content.length > 250 ? post.content.slice(0, 250) + '...' : post.content}</p>
              </div>

              <div className="post-actions">
                <div className="like-section">
                  <span className="material-symbols-outlined thumb-icon" onClick={() => togglePostLike(userData.handle, post.id)}>
                    thumb_up <span className="like-count"> {post.likedBy ? Object.keys(post.likedBy).length : 0} </span>
                  </span>
                </div>
                <button onClick={() => navigate(`/posts/${post.id}`)} className="button-details"> Details </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

Home.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    createdOn: PropTypes.string,
    likedBy: PropTypes.array,
  }),
  togglePostLike: PropTypes.func,
};
