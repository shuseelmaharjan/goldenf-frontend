import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center py-5" style={{marginTop:'120px', height:'60vh'}}>
      <h1 className="display-4">404 - Page Not Found</h1>
      <p className="lead">Oops! The page you are looking for does not exist.</p>
      <p>Please go back to the <Link to="/">home page</Link>.</p>
    </div>
  );
};

export default NotFound;
