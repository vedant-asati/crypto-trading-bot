import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Welcome to Crypto Bot</h2>
        <p className="text-lg text-gray-400 text-center mb-12">
          Our crypto bot helps you automate trading to maximize your profits. Below are options to buy and sell tokens.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">Buy Tokens</h3>
            <p className="text-gray-400 mb-4">
              Use our bot to buy tokens at the best market rates. Click here to start buying now!
            </p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-md transition duration-300">
              Buy Now
            </button>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">Sell Tokens</h3>
            <p className="text-gray-400 mb-4">
              Use our bot to sell tokens at the best market rates. Click here to start selling now!
            </p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-md transition duration-300">
              Sell Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
