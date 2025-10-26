import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className = '', shadow = true, hover = false, ...rest }) => {
  const shadowClass = shadow ? 'shadow' : '';
  const hoverClass = hover ? 'hover:shadow-lg transition-shadow duration-300' : '';
  
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg p-6 ${shadowClass} ${hoverClass} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  shadow: PropTypes.bool,
  hover: PropTypes.bool,
};

export default Card;
