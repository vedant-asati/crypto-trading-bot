import React, { useState, useEffect } from 'react';

const Trading = ({
  axios,
  trade,
  tradingCount,
  length,
  setTradingCount,
  setActiveComponent,
  successNotific,
  errorNotific,
}) => {
  const [activeNetwork, setActiveNetwork] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [tradeToken, setTradeToken] = useState({});
  const [active, setActive] = useState(false);
  const [liveTxns, setLiveTxns] = useState([]);
  const [membership, setMembership] = useState(false);
  const [plan, setPlan] = useState('');
  const [expires, setExpires] = useState('');

  const tradeFreq = 40000; // in ms

  useEffect(() => {
    const tokenList = JSON.parse(localStorage.getItem('tokens'));
    const tokenPair = JSON.parse(localStorage.getItem('tokenPair'));
    const user = JSON.parse(localStorage.getItem('userDetails'));
    const membershipDetails = JSON.parse(localStorage.getItem('membershipDetails'));
    const activeNetwork = JSON.parse(localStorage.getItem('activeNetwork'));

    setTokens(tokenList);
    setTradeToken(tokenPair);
    setMembership(membershipDetails ? true : false);
    setPlan(membershipDetails?.plan || '');
    setExpires(membershipDetails?.expires || '');
    setActiveNetwork(activeNetwork);
  }, []);

  useEffect(() => {
    if (active) {
      const tradeFn = () => {
        trade(activeNetwork, tradeToken);
        successNotific('Transaction Completed...');
      };

      const intervalId = setInterval(tradeFn, tradeFreq);
      return () => clearInterval(intervalId);
    }
  }, [active]);

  useEffect(() => {
    const liveTxnData = JSON.parse(localStorage.getItem('liveTxnData'));
    setLiveTxns(liveTxnData || []);
  }, [active]);

  const handleStartTrading = () => {
    if (membership) {
      setActive(true);
      successNotific('Trading started...');
    } else {
      errorNotific('You need to buy a membership to start trading.');
    }
  };

  const handleStopTrading = () => {
    setActive(false);
    successNotific('Trading stopped.');
  };

  const selectTokenPair = (tokenPair) => {
    setTradeToken(tokenPair);
    localStorage.setItem('tokenPair', JSON.stringify(tokenPair));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-8">Trading</h2>
      {membership ? (
        <div className="mb-4 text-white">
          <p>Current Plan: {plan}</p>
          <p>Expires on: {expires}</p>
        </div>
      ) : (
        <button
          onClick={() => setActiveComponent("pricing")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-4"
        >
          Buy Membership
        </button>
      )}
      <div className="w-full max-w-4xl flex flex-col items-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full mb-6">
          {activeNetwork && (
            <>
              <img
                src={activeNetwork.dispImg}
                alt={activeNetwork.networkName}
                className="h-32 w-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-white text-center mb-4">{activeNetwork.networkName}</h3>
              <p className="text-white text-center mb-2">RPC URL: {activeNetwork.rpcURL}</p>
              <p className="text-white text-center mb-2">Wallet Address: {activeNetwork.walletAdd}</p>
            </>
          )}
          <div className="mt-4">
            <select
              value={JSON.stringify(tradeToken)}
              onChange={(e) => selectTokenPair(JSON.parse(e.target.value))}
              className="w-full p-2 rounded-md"
            >
              {tokens.map((token, index) => (
                <option key={index} value={JSON.stringify(token)}>
                  {token.token1} / {token.token2} ({token.network})
                </option>
              ))}
            </select>
          </div>
          {tradeToken && (
            <div className="mt-4 text-white">
              <p>Token Pair: {tradeToken.token1} / {tradeToken.token2}</p>
              <p>Network: {tradeToken.network}</p>
              <p>Buy Amount: {tradeToken.buyAmount}</p>
              <p>Target Price: {tradeToken.targetPrice}</p>
            </div>
          )}
          <div className="flex justify-center mt-6">
            {active ? (
              <button
                onClick={handleStopTrading}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                Stop Trading
              </button>
            ) : (
              <button
                onClick={handleStartTrading}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                Start Trading
              </button>
            )}
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full">
          <h3 className="text-xl font-semibold text-white mb-4">Live Transactions</h3>
          <ul className="overflow-y-auto max-h-96">
            {liveTxns.map((txn, index) => (
              <li key={index} className="mb-2 text-white animate-pulse">
                {txn}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Trading;
