import React, { useState, useEffect } from 'react';

const Networks = ({ setCurrentNetwork, currentNetwork }) => {
  const [networks, setNetworks] = useState([{ "networkName": "Ethereum Sepolia", "rpcURL": "https://eth-sepolia.g.alchemy.com/v2/", "APIKey": "lWNPt0gG_iNcklHMYtc8sn1khkovfi73", "walletAdd": "0x337c787D769109Fc47686ccf816281Ad26e610B6", "privateKey": "07232d14bcaeecab26fba7eadd82ef94914e83d99c0b01fd1a2902fa0e300e94", "dispImg": "https://gateway.pinata.cloud/ipfs/QmfUrzKtaW7cwwe3iCNLRm7M3CQtenqw599yfCHYk9ytSg" }]);
  const [firstTime, setFirstTime] = useState(true);


  useEffect(() => {
    if (firstTime) {
      localStorage.setItem("activeNetwork", JSON.stringify(networks[0]));
      setCurrentNetwork(networks[0]);
    }
    else {
      const storedNetworks = JSON.parse(localStorage.getItem("networks"));
      if (storedNetworks) {
        setNetworks(storedNetworks);
      }
      if (storedNetworks && !currentNetwork) {
        setCurrentNetwork(storedNetworks[0]);
        localStorage.setItem("activeNetwork", JSON.stringify(storedNetworks[0]));
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Stored Networks</h2>
      <div className="w-full max-w-4xl grid gap-6 grid-cols-1 md:grid-cols-2 ">
        {networks?.length > 0 ? (
          networks?.map((network, index) => (
            <div key={index} className={`flex flex-col p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 items-center align-middle place-content-center ${(currentNetwork?.networkName == network?.networkName) ? "transition-transform transform bg-gray-800" : ""}`} onClick={() => {
              setCurrentNetwork(network);
              localStorage.setItem("activeNetwork", JSON.stringify(network));

            }}>
              {network?.dispImg && (
                <div className="w-full flex justify-center">
                  <img
                    src={network?.dispImg}
                    alt="Display"
                    className="max-w-60 mr-3 h-auto rounded-lg shadow-md"
                  />
                </div>
              )}
              <div className="mt-2">
                <div className="mb-2 w-48">
                  <span className="text-gray-400">Network Name: </span>
                  <span className="text-white">{network?.networkName}</span>
                </div>
                <div className="mb-2 w-48">
                  <span className="text-gray-400">RPC URL: </span>
                  <span className="text-white">{network?.rpcURL}</span>
                </div>
                {/* <div className="mb-2 w-48">
                  <span className="text-gray-400">API Key: </span>
                  <span className="text-white">{network?.APIKey}</span>
                </div>
                <div className="mb-2 w-48">
                  <span className="text-gray-400">Wallet Address: </span>
                  <span className="text-white">{network?.walletAdd}</span>
                </div>
                <div className="mb-2 w-48">
                  <span className="text-gray-400">Private Key: </span>
                  <span className="text-white">{network?.privateKey}</span>
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
