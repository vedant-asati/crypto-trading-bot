import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { TopExchangeTokens } from '../components';

export const Context = React.createContext();

export const Provider = ({ children }) => {
    const tradingBot = 'bot';
    const [topTokens, setTopTokens] = useState([]);
    const [tradingCount, setTradingCount] = useState(0);
    const [loader, setLoader] = useState(false);

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


    const buyToken = async () => {
        try {

        } catch (err) {
            console.log(err);
        }
    }
    const sellToken = async () => {
        try {

        } catch (err) {
            console.log(err);
        }
    }
    const trade = async () => {
        try {

        } catch (err) {
            console.log(err);
        }
    }

    return <Context.Provider value={{
        tradingBot,
        trade,
        topTokens
    }}>{children}</Context.Provider>

}