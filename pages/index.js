import React, { useState, useEffect, useContext } from 'react';
import { ContractEventPayload, ethers } from 'ethers';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

// internal import
import { AddNetwork, AddTokenPair, Home, Networks, Pricing, Profile, Setting, TopExchangeTokens, TradeTokens, Trading, Footer, Header, Loader, Login, MovingSubmenu, Preloader, Search, SideBar, Signup, useTimeout } from "../components/index";
import { Context } from "../context/context";

const index = () => {
  const { tradingBot,
    topTokens,
    trade,
    tradingCount,
    length,
    setTradingCount,
    setLoader,
    loader } = useContext(Context);

  // state variables
  const [activeComponent, setActiveComponent] = useState("trading");
  const [membershipType, setMembershipType] = useState("premium");
  const [authId, setAuthId] = useState("");
  const [networks, setNetworks] = useState({});
  const [currentNetwork, setCurrentNetwork] = useState("Ethereum Mainnet");

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

      <Header
        currentNetwork={currentNetwork}
        setActiveComponent={setActiveComponent}
      />
      {/* <Search /> */}
      {
        <div className="flex min-h-screen m-0 p-0 ">
          <SideBar setActiveComponent={setActiveComponent} />
          <div className="flex-1 flex flex-col">

            <div className="flex-1 p-4">
              {activeComponent === "home" ? (<Home />) :
                activeComponent === "trade-tokens" ? (<TradeTokens />) :
                  activeComponent === "top-exchange-tokens" ? (<TopExchangeTokens />) :
                    activeComponent === "networks" ? (<Networks setNetworks={setNetworks} setCurrentNetwork={setCurrentNetwork} currentNetwork={currentNetwork} />) :
                      activeComponent === "add-network" ? (<AddNetwork axios={axios} setNetworks={setNetworks} errorNotific={errorNotific} successNotific={successNotific} />) :
                        activeComponent === "trading" ? (<Trading
                          axios={axios}
                          trade={trade}
                          tradingCount={tradingCount}
                          length={length}
                          setTradingCount={setTradingCount}
                          setActiveComponent={setActiveComponent}
                          errorNotific={errorNotific} 
                          successNotific={successNotific}
                        />) :
                          activeComponent === "pricing" ? (<Pricing errorNotific={errorNotific} successNotific={successNotific} />) :
                            activeComponent === "profile" ? (<Profile axios={axios} errorNotific={errorNotific} successNotific={successNotific} />) :
                              activeComponent === "settings" ? (<Setting setActiveComponent={setActiveComponent} />) :
                                activeComponent === "add-token-pair" ? (<AddTokenPair setActiveComponent={setActiveComponent} errorNotific={errorNotific} successNotific={successNotific} />) :
                                  activeComponent === "login" ? (<Login axios={axios} errorNotific={errorNotific} successNotific={successNotific} setActiveComponent={setActiveComponent} />) :
                                    activeComponent === "signup" ? (<Signup axios={axios} errorNotific={errorNotific} successNotific={successNotific} setActiveComponent={setActiveComponent} />)
                                      : null}
            </div>
          </div>
        </div>
      }
      <Toaster position="top-right" reverseOrder={false} />
      <Footer />
    </>
  );
};

export default index;
