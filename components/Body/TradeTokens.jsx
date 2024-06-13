import React, { useState, useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast";

const TradeTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTokenPair, setSelectedTokenPair] = useState(null);

  useEffect(() => {
    const storedTokens = JSON.parse(localStorage.getItem("tokens"));
    const storedTokenPair = JSON.parse(localStorage.getItem("tokenPair"));
    setTokens(storedTokens || []);
    setFilteredTokens(storedTokens || []);
    setSelectedTokenPair(storedTokenPair);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = tokens.filter(token => 
      token.token1.toLowerCase().includes(query) || 
      token.token2.toLowerCase().includes(query)
    );
    setFilteredTokens(filtered);
  }

  const selectTokenPair = (token) => {
    setSelectedTokenPair(token);
    localStorage.setItem("tokenPair", JSON.stringify(token));
    toast.success("Token pair selected successfully", { duration: 1500 });
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Trade Tokens</h2>
      <div className="w-full max-w-4xl mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search token pairs..."
          className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      <div className="w-full max-w-4xl">
        {filteredTokens.length > 0 ? (
          filteredTokens.map((token, index) => (
            <div
              key={index}
              className={`p-6 rounded-3xl shadow-md transition duration-300 mb-4 flex justify-between items-center bg-gray-800 hover:shadow-xl`}
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">{token.token1} / {token.token2}</h3>
                <p className="text-gray-400 mb-2">Token 1 Address: {token.token1Address}</p>
                <p className="text-gray-400 mb-2">Token 2 Address: {token.token2Address}</p>
                <p className="text-gray-400 mb-2">Network: {token.network}</p>
                <p className="text-gray-400 mb-2">Fee: {token.fee}</p>
                <p className="text-gray-400 mb-2">Buy Amount: {token.buyAmount}</p>
                <p className="text-gray-400 mb-2">Target Price: {token.targetPrice}</p>
                <p className="text-gray-400 mb-2">Message: {token.message}</p>
              </div>
              <button
                className={`py-2 px-4 rounded-md transition duration-300 font-bold ${
                  selectedTokenPair?.token1 === token.token1 && selectedTokenPair?.token2 === token.token2 
                    ? 'bg-purple-800 hover:bg-purple-900 text-white' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
                onClick={() => selectTokenPair(token)}
              >
                {selectedTokenPair?.token1 === token.token1 && selectedTokenPair?.token2 === token.token2 ? 'Selected' : 'Select'}
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No token pairs found. Please add some tokens.</p>
        )}
      </div>
    </div>
  );
}

export default TradeTokens;
