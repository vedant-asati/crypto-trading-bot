import React, { useState, useEffect } from 'react';

const Networks = ({ setCurrentNetwork, currentNetwork }) => {
  const [networks, setNetworks] = useState([]);
  const [selected, setSelected] = useState("Ethereum Mainnet")

  useEffect(() => {
    const storedNetworks = JSON.parse(localStorage.getItem("networks"));
    if (storedNetworks) {
      setNetworks(storedNetworks);
    }
    // setSelected(currentNetwork);
    setCurrentNetwork(storedNetworks[0].networkName);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Stored Networks</h2>
      <div className="w-full max-w-4xl grid gap-6 grid-cols-1 md:grid-cols-2 ">
        {networks.length > 0 ? (
          networks.map((network, index) => (
            <div key={index} className={`flex flex-col p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 items-center align-middle place-content-center ${(currentNetwork == network.networkName) ? "transition-transform transform bg-gray-800" : ""}`} onClick={() => { setCurrentNetwork(network.networkName) }}>
              {network.dispImg && (
                <div className="w-full flex justify-center">
                  <img
                    src={network.dispImg}
                    alt="Display"
                    className="max-w-60 mr-3 h-auto rounded-lg shadow-md"
                  />
                </div>
              )}
              <div className="mt-2">
                <div className="mb-2 w-48">
                  <span className="text-gray-400">Network Name: </span>
                  <span className="text-white">{network.networkName}</span>
                </div>
                <div className="mb-2 w-48">
                  <span className="text-gray-400">RPC URL: </span>
                  <span className="text-white">{network.rpcURL}</span>
                </div>
                {/* <div className="mb-2 w-48">
                  <span className="text-gray-400">API Key: </span>
                  <span className="text-white">{network.APIKey}</span>
                </div>
                <div className="mb-2 w-48">
                  <span className="text-gray-400">Wallet Address: </span>
                  <span className="text-white">{network.walletAdd}</span>
                </div>
                <div className="mb-2 w-48">
                  <span className="text-gray-400">Private Key: </span>
                  <span className="text-white">{network.privateKey}</span>
                </div> */}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No networks stored yet.</p>
        )}
      </div>
    </div>
  );
};

export default Networks;
