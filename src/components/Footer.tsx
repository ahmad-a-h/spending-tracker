import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faHome } from '@fortawesome/free-solid-svg-icons';



const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around items-center p-4">
      <Link to="/" className="flex flex-col items-center">
        <FontAwesomeIcon icon={faHome} style={{ color: 'black', fontSize: '30px' }} />
      </Link>
      <div className="flex flex-col items-center cursor-pointer ">
        <FontAwesomeIcon icon={faGear} style={{ color: 'black', fontSize: '30px' }} />
      </div>
    </div>
  );
};

export default Footer; 