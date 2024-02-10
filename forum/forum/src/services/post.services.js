import { ref, push, get, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';

/**
 *
 * @param {*} author
 * @param {*} title
 * @param {*} content
 * @param {*} comments // actually on update we will get the comments
 * @param {*} likes
 * @param {*} dislikes
 * @returns
 */
export const addPost = async (author, title, content) => {
  return push(ref(db, 'posts'), {
    author,
    title,
    content,
    createdOn: Date.now(),
  });
};

export const getAllPosts = async (search) => {
  const snapshot = await get(query(ref(db, 'posts')));
  if (!snapshot.exists()) {
    return [];
  }

  const posts = Object.keys(snapshot.val()).map(key => ({
    id: key,
    ...snapshot.val()[key],
    createdOn: new Date(snapshot.val()[key].createdOn).toString(),
    likedBy: snapshot.val()[key].likedBy ? Object.keys(snapshot.val()[key].likedBy) : [],
  }))
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
  console.log(posts);

  return posts;
};

export const getPostById = async (id) => {

  const snapshot = await get(ref(db, `posts/${id}`));
  if (!snapshot.exists()) {
    return null;
  }

  const post = {
    id,
    ...snapshot.val(),
    createdOn: new Date(snapshot.val().createdOn).toString(),
    likedBy: snapshot.val().likedBy ? Object.keys(snapshot.val().likedBy) : [],
  };

  return post;
};

export const likePost = (handle, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${handle}`] = true;
  updateLikes[`/users/${handle}/likedposts/${postId}`] = true;

  return update(ref(db), updateLikes);
};

export const dislikePost = (handle, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/likedposts/${postId}`] = null;

  return update(ref(db), updateLikes);
};

