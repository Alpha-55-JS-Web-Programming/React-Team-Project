import { ref, push, get, query, update, getDatabase, remove } from 'firebase/database';
import { db } from '../config/firebase-config';
import { format } from 'date-fns';
import { getUserByHandle } from './users.service';
import { set } from 'firebase/database';

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
  const readableDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

  // Use push without providing a key to generate a unique ID
  const newPostRef = push(ref(db, 'posts'));

  // Get the automatically generated key (ID) for the new post
  const postId = newPostRef.key;

  // Set the post data along with the generated ID
  await set(newPostRef, {
    id: postId,
    author,
    title,
    content,
    createdOnReadable: readableDate,
    likedBy: {},
  });

  return postId;
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
    // Initialize comments array to handle posts without comments
    comments: snapshot.val().comments ? Object.values(snapshot.val().comments) : [],
  };

  const userSnapshot = await getUserByHandle(post.author);
  if (userSnapshot.exists()) {
    const user = userSnapshot.val();
    return { ...post, authorDetails: user };
  } else {
    return post;
  }
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

export const addCommentToPost = (postId, commentData) => {
  const commentsRef = ref(db, `posts/${postId}/comments`);
  return push(commentsRef, commentData);
};

export const deletePost = async (postId) => {
  const postRef = ref(db, `posts/${postId}`);

  try {
    await remove(postRef);
    console.log('Post deleted successfully.');
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error; // Re-throw the error to let the caller handle it
  }
};

export const getPostsCount = async () => {
  const snapshot = await get(query(ref(db, 'posts')));
  return snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
};