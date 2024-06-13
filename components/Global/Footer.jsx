import React from 'react';

const Footer = () => {
  return (
    <footer className=" bg-gray-900 text-gray-400 p-4 mt-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div>
          <p>&copy; 2024 Crypto Bot. All rights reserved.</p>
          <p>Privacy Policy | Terms of Service</p>
        </div>
        <div>
          <p>Contact us: support@cryptobot.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
