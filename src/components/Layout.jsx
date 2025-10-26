import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, navbarLinks = [], footerLinks = [] }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar links={navbarLinks} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer links={footerLinks} />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  navbarLinks: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  footerLinks: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default Layout;
