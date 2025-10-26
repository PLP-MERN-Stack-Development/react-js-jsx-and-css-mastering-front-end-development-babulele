import React, { useState, useEffect } from 'react';
import { fetchPosts, fetchAllPosts } from '../api/jsonPlaceholder';
import PostCard from '../components/PostCard';
import Button from '../components/Button';
import Card from '../components/Card';

const APIData = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('paginated'); // 'paginated' or 'all'
  const postsPerPage = 10;

  // Fetch posts on component mount
  useEffect(() => {
    loadPosts();
  }, [currentPage]);

  // Filter posts based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      if (viewMode === 'paginated') {
        setFilteredPosts(posts.slice(0, postsPerPage));
      } else {
        setFilteredPosts(posts);
      }
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts, viewMode]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (viewMode === 'paginated') {
        // Load paginated posts
        const data = await fetchPosts(currentPage, postsPerPage);
        setPosts(data);
        setFilteredPosts(data);
      } else {
        // Load all posts for search
        const data = await fetchAllPosts();
        setPosts(data);
        setFilteredPosts(data);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNextPage = () => {
    if (viewMode === 'paginated' && posts.length === postsPerPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'paginated' ? 'all' : 'paginated');
    setCurrentPage(1);
    setSearchTerm('');
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card>
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading Data
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <Button variant="primary" onClick={loadPosts}>
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          API Data - JSONPlaceholder Posts
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore posts fetched from JSONPlaceholder API
        </p>
      </div>

      {/* Controls */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="flex-1 w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search posts by title or body..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 focus:border-blue-500"
            />
          </div>

          {/* View Mode Toggle */}
          <Button
            variant={viewMode === 'paginated' ? 'primary' : 'secondary'}
            onClick={toggleViewMode}
          >
            {viewMode === 'paginated' ? 'Load All Posts' : 'Pagination Mode'}
          </Button>
        </div>

        {/* Pagination Controls (only in paginated mode) */}
        {viewMode === 'paginated' && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage}
            </span>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || loading}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleNextPage}
                disabled={posts.length < postsPerPage || loading}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {searchTerm
              ? `Found ${filteredPosts.length} result${filteredPosts.length !== 1 ? 's' : ''}`
              : `Showing ${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''}`
            }
          </p>
        </div>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card>
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading posts...</p>
          </div>
        </Card>
      )}

      {/* Posts Grid */}
      {!loading && filteredPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && filteredPosts.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm
                ? 'No posts found matching your search.'
                : 'No posts available.'
              }
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default APIData;
