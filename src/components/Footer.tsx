import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around items-center p-4">
      <Link to="/" className="flex flex-col items-center">
        <span className="material-icons">home</span>
        <span className="text-sm">Home</span>
      </Link>
      <Link to="/add" className="flex flex-col items-center">
        <span className="material-icons text-#255290 text-38">add_circle</span>
        <span className="text-sm">Add</span>
      </Link>
    </div>
  );
};

export default Footer; 