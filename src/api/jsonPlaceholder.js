/**
 * API service for JSONPlaceholder
 * Documentation: https://jsonplaceholder.typicode.com/
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch posts from JSONPlaceholder API
 * @param {number} page - Page number (starts from 1)
 * @param {number} limit - Number of items per page
 * @returns {Promise<Array>} Array of posts
 */
export const fetchPosts = async (page = 1, limit = 10) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  
  const response = await fetch(`${BASE_URL}/posts?_start=${start}&_limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

/**
 * Fetch all posts (for searching)
 * @returns {Promise<Array>} Array of all posts
 */
export const fetchAllPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

/**
 * Fetch users from JSONPlaceholder API
 * @returns {Promise<Array>} Array of users
 */
export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

/**
 * Fetch comments for a specific post
 * @param {number} postId - Post ID
 * @returns {Promise<Array>} Array of comments
 */
export const fetchPostComments = async (postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};
