import React, { useState, useEffect, useContext } from 'react';
import { ContractEventPayload, ethers } from 'ethers';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

// internal import
import { AddNetwork, AddTokenPair, Home, Networks, Price, Profile, Setting, TopExchangeTokens, TradeTokens, Trading, Footer, Header, Loader, Login, MovingSubmenu, Preloader, Search, SideBar, Signup, useTimeout } from "../components/index";
import { Context } from "../context/context";

const index = () => {
  const { tradingBot } = useContext(Context);

  // state variables
  const [activeComp, setActiveComp] = useState("home");
  const [membershipType, setMembershipType] = useState("premium");
  const [authId, setAuthId] = useState("");
  const [Networks, setNetworks] = useState({});
  const [currentNetwork, setCurrentNetwork] = useState("");

  // notifications
  const errorNotific = (msg) => {
    toast.error(msg, { duration: 1500 });
  }
  const successNotific = (msg) => {
    toast.success(msg, { duration: 1500 });
  }


  return (
    <>
      <div>Hey Jai Siyaram.... Welcome from {tradingBot}</div>
      <MovingSubmenu />
      {/* <Preloader /> */}

      {activeComp == "signup" ? (
        <Signup axios={axios} errorNotific={errorNotific} successNotific={successNotific} setActiveComp={setActiveComp} />
      ) : (
        <div className='techwave_fn_wrapper'>
          <div className='techwave_fn_wrap'>
            
            {/* global components */}
            <Search />
            <Header
              currentNetwork={currentNetwork}
              setActiveComp={setActiveComp}
            />
            <SideBar setActiveComp={setActiveComp} />

            {/* activeComp */}
            {
              activeComp == "home" ?
              (<Home />) :
              activeComp == "trade-tokens" ?
              (<TradeTokens />) :
              activeComp == "top-exchange-tokens" ?
              (<TopExchangeTokens />) :
              activeComp == "networks" ?
              (<Networks setNetworks={setNetworks} />) :
              activeComp == "trading" ?
              (<Trading axios={axios} />) :
              activeComp == "price" ?
              (<Price />) :
              activeComp == "profile" ?
              (<Profile setActiveComp={setActiveComp} />) :
              activeComp == "settings" ?
              (<Setting setActiveComp={setActiveComp} />) :
              activeComp == "add-token-pair" ?
              (<AddTokenPair setActiveComp={setActiveComp} />) : ("")
            }
          </div>
        </div>
      )}

      {(activeComp == "login") ? <Login axios={axios} errorNotific={errorNotific} successNotific={successNotific} setActiveComp={setActiveComp} /> : ""}

    </>
  );
};

export default index;
