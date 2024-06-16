import React, { useEffect, useState } from 'react';

const Header = ({ account, setActiveComponent, currentNetwork }) => {

  const [userDetails, setUserDetails] = useState({});
  const [membership, setMembership] = useState(false);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const userMembership = (localStorage.getItem("membershipType"));

    setMembership(userMembership);
    setUserDetails(user);
  }, []);



  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 shadow-md">
      <div className="flex items-center space-x-4 ">
        <img src="img/crypto.png" alt="Logo" className="w-12 h-12" />
        <h1 className="text-gray-600 text-xl font-mono p-1.5 border-solid border rounded-lg border-gray-800 ">{currentNetwork?.networkName}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        {
          membership ?
            <button
              onClick={() => setActiveComponent("trade-tokens")}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition duration-300"
            >
              Trade
            </button>
            :
            <button
              onClick={() => setActiveComponent("pricing")}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition duration-300"
            >
              Upgrade
            </button>
        }
        <div className="text-white">{account}</div>
      </div>
    </header>
  );
};

export default Header;
