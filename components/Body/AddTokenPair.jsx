import React, { useState } from 'react';

const AddTokenPair = ({errorNotific,successNotific}) => {

  const [token, setToken] = useState({
    token1: "",
    token2: "",
    token1Address: "",
    token2Address: "",
    network: "",
    fee: "",
    buyAmount: "",
    targetPrice: "",
    message: "",
  });

  const handleChange = (e) => {
    setToken({ ...token, [e.target.name]: e.target.value });
  }

  const store = () => {
    const {
      token1,
      token2,
      token1Address,
      token2Address,
      network,
      fee,
      buyAmount,
      targetPrice,
      message,
    } = token;

    if (!token1 || !token2 || !token1Address || !token2Address || !network || !fee || !buyAmount || !targetPrice || !message) {
      return errorNotific("Kindly fill all details...");
    }

    let tokenArr = [];
    if (localStorage.getItem("tokens")) {
      tokenArr = JSON.parse(localStorage.getItem("tokens"));
    }

    tokenArr.push(token);
    localStorage.setItem("tokens", JSON.stringify(tokenArr));
    return successNotific("Token pair successfully added...");
  }

  const handleSubmit = () => {
    store();
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Add Token Pair</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="token1"
            placeholder="Token 1"
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={handleChange}
          />
          <input
            type="text"
            name="token2"
            placeholder="Token 2"
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={handleChange}
          />
          <input
            type="text"
            name="token1Address"
            placeholder="Token 1 Address"
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={handleChange}
          />
          <input
            type="text"
            name="token2Address"
            placeholder="Token 2 Address"
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={handleChange}
          />
          <input
            type="text"
            name="network"
            placeholder="Network"
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={handleChange}
          />
          <input
            type="text"
            name="fee"
            placeholder="Fee (in Token 1)"
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={handleChange}
          />
          <input
            type="text"
            name="buyAmount"
            placeholder="Buy Amount"
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={handleChange}
          />
          <input
            type="text"
            name="targetPrice"
            placeholder="Target Price (in Token 2)"
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={handleChange}
          />
          <input
            type="text"
            name="message"
            placeholder="Message"
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={handleChange}
          />
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-md transition duration-300"
            onClick={handleSubmit}
          >
            Add Token Pair
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTokenPair;
