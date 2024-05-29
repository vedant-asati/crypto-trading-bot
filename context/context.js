import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

export const Context = React.createContext();

export const Provider = ({ children }) => {
    const tradingBot = 'bot';

    const loadInitialData = async () => {
        try {

        } catch (err) {
            console.log(err);
        }
    }
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
    }}>{children}</Context.Provider>

}