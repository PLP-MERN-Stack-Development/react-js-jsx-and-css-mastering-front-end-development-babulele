import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const PostCard = ({ post, onViewDetails }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 p-6 animate-fade-in hover:scale-105">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
          Post #{post.id}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          User {post.userId}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
        {post.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
        {post.body}
      </p>
      
      {onViewDetails && (
        <Button 
          variant="primary" 
          size="sm" 
          onClick={() => onViewDetails(post.id)}
          className="w-full"
        >
          View Details
        </Button>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  onViewDetails: PropTypes.func,
};

export default PostCard;
