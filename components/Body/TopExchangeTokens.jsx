import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../../context/context';
import { MdOutlineContentCopy } from "react-icons/md";

const TopExchangeTokens = () => {
  const { topTokens } = useContext(Context);
  const [tokens, setTokens] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (topTokens) {
      setTokens(topTokens);
    }
  }, [topTokens]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const formatNumber = (num) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + 'B';
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + 'M';
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + 'K';
    }
    return num;
  };

  const filteredTokens = tokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm) ||
    token.symbol.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Top Exchange Tokens</h1>
      <div className="max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search Tokens"
          className="w-full mb-4 p-2 bg-gray-800 text-white rounded-md"
          onChange={handleSearch}
          value={searchTerm}
        />
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full bg-gray-800">
            <thead>
              <tr className="bg-gray-700 rounded-xl">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Symbol</th>
                <th className="p-4 text-left hidden sm:table-cell">Total Supply</th>
                <th className="p-4 text-left">Volume (USD)</th>
                <th className="p-4 text-left hidden sm:table-cell">Total Value Locked (USD)</th>
              </tr>
            </thead>
            <tbody>
              {filteredTokens.length > 0 ? (
                filteredTokens.slice(0, 20).map((token, index) => (
                  <tr key={index} className="bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out rounded-xl">

                    <td className="p-4">{token.name}&nbsp;
                      <button onClick={() => navigator.clipboard.writeText(token.id)}>
                        <MdOutlineContentCopy />
                      </button>
                    </td>
                    <td className="p-4">{token.symbol}</td>
                    <td className="p-4 hidden sm:table-cell">{formatNumber(token.totalSupply)}</td>
                    <td className="p-4">{formatNumber(parseFloat(token.volumeUSD))}</td>
                    <td className="p-4 hidden sm:table-cell">{formatNumber(parseFloat(token.totalValueLockedUSD))}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopExchangeTokens;
