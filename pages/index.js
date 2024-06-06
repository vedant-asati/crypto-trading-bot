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
  const [activeComp, setActiveComponent] = useState("login");
  const [membershipType, setMembershipType] = useState("premium");
  const [authId, setAuthId] = useState("");
  const [networks, setNetworks] = useState({});
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
      {/* <div className="p-4">Hey Jai Siyaram.... Welcome from {tradingBot}</div> */}
      {/* <MovingSubmenu /> */}

      {
        <div className="flex min-h-screen m-0 p-0  place-items-center">
            <SideBar setActiveComponent={setActiveComponent} />
          <div className="flex-1 flex flex-col">
            {/* <Search /> */}
            {/* <Header
              currentNetwork={currentNetwork}
              setActiveComponent={setActiveComponent}
            /> */}

            <div className="flex-1 p-4">
              {activeComp === "home" ? (<Home />) :
              activeComp === "trade-tokens" ? (<TradeTokens />) :
              activeComp === "top-exchange-tokens" ? (<TopExchangeTokens />) :
              activeComp === "networks" ? (<Networks setNetworks={setNetworks} />) :
              activeComp === "trading" ? (<Trading axios={axios} />) :
              activeComp === "price" ? (<Price />) :
              activeComp === "profile" ? (<Profile setActiveComponent={setActiveComponent} />) :
              activeComp === "settings" ? (<Setting setActiveComponent={setActiveComponent} />) :
              activeComp === "add-token-pair" ? (<AddTokenPair setActiveComponent={setActiveComponent} />):
              activeComp === "login" ? (<Login axios={axios} errorNotific={errorNotific} successNotific={successNotific} setActiveComponent={setActiveComponent} />):
              activeComp === "signup" ? (<Signup axios={axios} errorNotific={errorNotific} successNotific={successNotific} setActiveComponent={setActiveComponent} />)
              : null}
            </div>
          </div>
        </div>
      }
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default index;
