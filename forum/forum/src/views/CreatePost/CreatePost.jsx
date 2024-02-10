import { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import { addPost } from "../../services/post.services";
import { AppContext } from "../../Context/AppContext";

export default function CreatePost() {
  const { userData } = useContext(AppContext);
  const [post, setPost] = useState({
    title: '',
    content: '',
  });

  const updatePost = (value, key) => {
    setPost({
      ...post,
      [key]: value,
    });
  };

  const createPost = async () => {
    if (post.title.length < 3) {
      return alert('Title must be at least 3 characters long');
    }
    if (post.content.length < 5) {
      return alert('Content must be at least 5 characters long');
    }

    // TODO: userData should be set when the user logs in
    await addPost(userData?.handle ?? 'test-user-id', post.title, post.content);

    setPost({
      title: '',
      content: '',
    });
  };

  return (
    <div>
      <h1>Create post</h1>
      <label htmlFor="input-title">Title:</label>
      <input value={post.title} onChange={e => updatePost(e.target.value, 'title')} type="text" name="input-title" id="input-title" /><br/>
      <label htmlFor="input-content">Content:</label><br/>
      <textarea value={post.content} onChange={e => updatePost(e.target.value, 'content')} name="input-content" id="input-content" cols="30" rows="10"></textarea><br/><br/>
      <Button onClick={createPost}>Create</Button>
    </div>
  );
}