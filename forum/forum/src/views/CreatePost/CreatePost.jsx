import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";

export function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [newPost, setNewPost] = useState([]);
  // useEffect(()=>{postNewThread().then(setNewPost)},[newPost])

  return (
    <div>
      <p>Create a thread</p>
      <label htmlFor="create-title">Title </label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="create-title" id="create-title"/>
      <br /><br />
      <label htmlFor="create-content">Content </label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} name="create-content" id="create-content" cols="30" rows="10"></textarea>
      <br /><br />
      <Button onClick={createPost}>Create</Button>
    </div>
  );
}

// export const postNewThread = async(p)=>{
// const response = await //not fetch, but firebase method
// const data = response.json()
// return data
// }

const createPost = async () => {
  await postNewThread({
    title,
    content,
  });
  setTitle("");
  setContent("");
  // then GET the new state from firebase and re-render with useEffect
};
