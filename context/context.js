import React, { useState, useEffect, act } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { TopExchangeTokens } from '../components';
import { local } from 'web3modal';
import { traceGlobals } from 'next/dist/trace/shared';

export const Context = React.createContext();

export const Provider = ({ children }) => {
    const tradingBot = 'bot';
    const [topTokens, setTopTokens] = useState([]);
    const [tradingCount, setTradingCount] = useState(0);
    const [loader, setLoader] = useState(false);
    const multiplier = 1e5;
    const bigMultiplier = BigInt(1e5);

    let length;

    const loadInitialData = async () => {
        try {
            const URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';
            const query = `{
                tokens(orderBy:volumeUSD,orderDirection:desc,first:20){
                    id
                    name
                    symbol
                    decimals
                    volume
                    volumeUSD
                    totalValueLockedUSD
                    totalSupply
                    feesUSD
                    txCount
                    poolCount
                    derivedETH
                }
            }`
            const topTokenData = await axios.post(URL, { query: query });
            console.log(topTokenData.data.data.tokens);
            setTopTokens(topTokenData.data.data.tokens);

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        loadInitialData();
    }, [])

    // UNISWAP contract address and ABI 
    const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Uniswap Router
    // const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6"; // Uniswap Quoter
    const quoterAddress = "0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3"; // Uniswap Quoter

    const ROUTER = (PROVIDER) => {
        const router = new ethers.Contract(
            routerAddress,
            [
                "function exactInputSingle((address tokenIn, address tokenOut, uint24 fee, address recipient, uint256 deadline, uint256 amountIn, uint256 amountOutMinimum, uint160 sqrtPriceLimitX96)) external payable returns (uint256 amountOut)",
            ],
            PROVIDER
        );
        return router;
    };
    const QUOTER = (PROVIDER) => {
        const quoter = new ethers.Contract(
            quoterAddress,
            [
                "function quoteExactInputSingle(address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint160 sqrtPriceLimitX96) public view returns (uint256 amountOut)",
            ],
            PROVIDER
        );
        return quoter;
    };
    const TOKEN = (PROVIDER, TOKEN_B) => {
        const token = new ethers.Contract(
            TOKEN_B,
            [
                "function approve(address spender, uint256 amount) external returns (bool)",
                "function allowance(address owner, address spender) public view returns (uint256)",
            ],
            PROVIDER
        );
        return token;
    };

    // Txns
    const buyToken = async (
        token1Address,
        token2Address,
        fee,
        address,
        buyAmount,
        router
    ) => {
        try {
            const deadline = Math.floor(Date.now() / 1000);
            const txn = await router.exactInputSingle(
                [token1Address, token2Address, fee, address, deadline, buyAmount, 0, 0],
                { value: buyAmount }
            );
            txn.wait();
            console.log(txn.hash);
            console.log(txn);
            return txn.hash;

        } catch (err) {
            console.log(err);
        }
    }
    const sellToken = async (
        token1Address,
        token2Address,
        fee,
        userAddress,
        buyAmount,
        sellAmount,
        router,
        account,
    ) => {
        try {
            const token = TOKEN(account, token2Address);
            const allowance = await token.allowance(userAddress, routerAddress);
            console.log("Current allowance: ", allowance);

            if (allowance < sellAmount) {
                console.log("Approving spend (bulk)");
                const atxn = token.approve(routerAddress, sellAmount);
                await atxn.wait();
            }
            const deadline = Math.floor(Date.now() / 1000) + 6000;

            const txn = await router.exactInputSingle(
                [token2Address, token1Address, fee, address, deadline, sellAmount, 0, 0]
            );
            txn.wait();
            console.log(txn.hash);
            console.log(txn);
            return txn.hash;

        } catch (err) {
            console.log(err);
        }
    }
    const trade = async (activeNetwork, tradeToken) => {
        setLoader(true);
        try {
            console.log("Starting"); //
            const provider = new ethers.JsonRpcProvider(`${activeNetwork.rpcURL}${activeNetwork.APIKey}`);
            console.log(provider);

            const wallet = new ethers.Wallet(activeNetwork.privateKey, provider);
            console.log(wallet);
            console.log("Connected to ethereum"); //

            const buyAmount = ethers.parseUnits(tradeToken.buyAmount, 'ether');
            const targetPrice = BigInt(Math.round(tradeToken.targetPrice * multiplier));
            const targetAmountOut = (buyAmount * targetPrice) / bigMultiplier;
            const sellAmount = buyAmount / targetPrice;


            const account = wallet.connect(provider);
            console.log("Running here"); //

            const token = TOKEN(account, tradeToken.token2Address);
            console.log("Running here 2", token); //
            const router = ROUTER(account);
            console.log("Running here 3", router); //
            const quoter = QUOTER(account);
            console.log("Running here 4", quoter); //
            console.log(tradeToken); //


            // checking price b4 trade
            const amountOut = await quoter.quoteExactInputSingle(
                tradeToken.token1Address,
                tradeToken.token2Address,
                tradeToken.fee * 1,
                buyAmount,
                0
            );
            console.log("Running here 5"); //

            console.log(amountOut);
            console.log(`Current Exchange amount: ${ethers.formatUnits(amountOut, 6)} ${tradeToken.token2} `);
            console.log(`Target Exchange amount: ${ethers.formatUnits((targetAmountOut/BigInt(1e12)),6)} ${tradeToken.token2} `);
            console.log("Running here 6"); //
            let transactionHash;
            if (amountOut < targetAmountOut) {
                console.log("Wait... buying token"); //
                transactionHash = await buyToken(
                    tradeToken.token1Address,
                    tradeToken.token2Address,
                    tradeToken.fee * 1,
                    wallet.address,
                    buyAmount,
                    router
                );
                console.log("Done buying", transactionHash); //

            }
            const userAddress = activeNetwork.walletAddress;
            if (amountOut > targetAmountOut) {
                console.log("Wait... selling token"); //
                transactionHash = await sellToken(
                    tradeToken.token1Address,
                    tradeToken.token2Address,
                    tradeToken.fee * 1,
                    wallet.address,
                    buyAmount,
                    sellAmount,
                    router,
                    account,
                );
                console.log("Done selling", transactionHash); //
            }
            console.log("Running here 7"); //
            // store data
            const liveTxnData = {
                currentRate: `${amountOut.toString()}`,
                targetRate: `${targetAmountOut.toString()}`,
                transactionHash: transactionHash,
            }
            console.log("Running here 8"); //

            let txnDataArray = [];

            const storedTxnData = localStorage.getItem("liveTxnData");

            if (storedTxnData) {
                const parsedData = JSON.parse(storedTxnData);
                parsedData.push(liveTxnData);
                txnDataArray = parsedData;
                localStorage.setItem("liveTxnData", JSON.stringify(txnDataArray));
            }
            else {
                txnDataArray.push(liveTxnData);
                localStorage.setItem("liveTxnData", JSON.stringify(txnDataArray));
            }
            console.log("liveTxnData", liveTxnData); //
            setTradingCount(txnDataArray.length + 1);
            console.log("count", tradingCount); //

            console.log(txnDataArray);
            setLoader(false);

        } catch (err) {
            console.log(err);
            setLoader(false);
        }
    }

    return <Context.Provider value={{
        tradingBot,
        trade,
        topTokens,
        tradingCount,
        length,
        setTradingCount,
        setLoader,
        loader
    }}>{children}</Context.Provider>

}