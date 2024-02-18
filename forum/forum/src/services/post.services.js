import { ref, push, get, query, update, remove, child } from 'firebase/database';
import { db } from '../config/firebase-config';
import { format } from 'date-fns';
import { getUserByHandle } from './users.service';
import { set } from 'firebase/database';

/**
 *
 * @param {*} author
 * @param {*} title
 * @param {*} content
 * @param {*} comments
 * @param {*} likes
 * @param {*} dislikes
 * @returns
 */
export const addPost = async (author, title, content, tags) => {
  const readableDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  const newPostRef = push(ref(db, 'posts'));
  const postId = newPostRef.key;

  await set(newPostRef, {
    id: postId,
    author,
    title,
    content,
    createdOnReadable: readableDate,
    likedBy: [],
    comments: [],
    tags: tags || [],
  });

  return postId;
};

export async function getUsers(userIds) {
  const users = {};
  for (const userId of userIds) {
    const snapshot = await get(child(ref(db, 'users'), userId));
    if (snapshot.exists()) {
      users[userId] = snapshot.val();
    } else {
      console.log(`No data available for user ID: ${userId}`);
    }
  }
  return users;
}

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
    throw error;
  }
};

export const getPostsCount = async () => {
  const snapshot = await get(query(ref(db, 'posts')));
  return snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
};

export const getTopCommentedPosts = async () => {
  const snapshot = await get(query(ref(db, 'posts')));
  if (!snapshot.exists()) {
    return [];
  }

  const posts = Object.keys(snapshot.val())
    .map(key => ({
      id: key,
      commentsCount: snapshot.val()[key].comments ? Object.keys(snapshot.val()[key].comments).length : 0,
      likedBy: snapshot.val()[key].likedBy || [],
      comments: snapshot.val()[key].comments || [],
      ...snapshot.val()[key],
    }))
    .sort((a, b) => b.commentsCount - a.commentsCount)
    .slice(0, 10);

  return posts;
};

export const getMostRecentPosts = async () => {
  const snapshot = await get(query(ref(db, 'posts')));
  if (!snapshot.exists()) {
    return [];
  }

  const posts = Object.keys(snapshot.val())
    .map(key => ({
      id: key,
      createdOn: new Date(snapshot.val()[key].createdOn).getTime(),
      likedBy: snapshot.val()[key].likedBy || [],
      comments: snapshot.val()[key].comments || [],
      ...snapshot.val()[key],
    }))
    .sort((a, b) => b.createdOn - a.createdOn)
    .slice(0, 10)
    .reverse();

  return posts;
};