import React, { useState, useEffect, useContext } from 'react';
import { ContractEventPayload, ethers } from 'ethers';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import bcrypt from "bcryptjs";

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
  const [activeComponent, setActiveComponent] = useState("login");
  const [membershipType, setMembershipType] = useState("");
  const [uid, setuid] = useState("");
  const [JWT, setJWT] = useState("");
  const [networks, setNetworks] = useState([{
    "networkName": "Ethereum Sepolia",
    "rpcURL": "https://eth-mainnet.g.alchemy.com/v2/",
    "APIKey": "97whpuTdIS8RVuVQcq2I31_FjfSC5o1i",
    "walletAdd": "0x337c787D769109Fc47686ccf816281Ad26e610B6",
    "privateKey": "07232d14bcaeecab26fba7eadd82ef94914e83d99c0b01fd1a2902fa0e300e94",
    "dispImg": "https://gateway.pinata.cloud/ipfs/QmfUrzKtaW7cwwe3iCNLRm7M3CQtenqw599yfCHYk9ytSg",
  }]);
  const [currentNetwork, setCurrentNetwork] = useState({
    "networkName": "Ethereum Sepolia",
    "rpcURL": "https://eth-mainnet.g.alchemy.com/v2/",
    "APIKey": "97whpuTdIS8RVuVQcq2I31_FjfSC5o1i",
    "walletAdd": "0x337c787D769109Fc47686ccf816281Ad26e610B6",
    "privateKey": "07232d14bcaeecab26fba7eadd82ef94914e83d99c0b01fd1a2902fa0e300e94",
    "dispImg": "https://gateway.pinata.cloud/ipfs/QmfUrzKtaW7cwwe3iCNLRm7M3CQtenqw599yfCHYk9ytSg",
  });

  // notifications
  const errorNotific = (msg) => {
    toast.error(msg, { duration: 1500 });
  }
  const successNotific = (msg) => {
    toast.success(msg, { duration: 1500 });
  }

  // load saved data
  useEffect(() => {
    const networks = JSON.parse(localStorage.getItem("networks"));
    const activeNetwork = JSON.parse(localStorage.getItem("activeNetwork"));
    const uid = localStorage.getItem("uid");
    const membershipHash = localStorage.getItem("membershipType");

    async function getMembership(membershipHash) {
      const mbArr = ["Basic", "Pro", "Enterprise"];
      for (let i = 0; i < mbArr.length; i++) {
        const ans = await bcrypt.compare(mbArr[i], membershipHash);
        if (ans) {
          console.log("membershipType:", mbArr[i]);
          setMembershipType(mbArr[i]);
        }
      }
    }
    if (membershipHash) {
      getMembership(membershipHash);
    }
    const userToken = localStorage.getItem("user-token");

    setNetworks(networks);
    setCurrentNetwork(activeNetwork);

    if (!userToken || !uid) {
      setActiveComponent("login");
    }
    else {
      setActiveComponent("home");
      setJWT(userToken);
      setuid(uid);
      setMembershipType(membershipType);
    }

  }, [])

  // buy membership
  const buyMembership = async (_membershipType) => {
    successNotific("Transaction is getting processed...");
    setMembershipType(_membershipType);
    setLoader(true);

    // send eth for membership
    const res = await axios({
      method: "POST",
      url: "/api/v1/user/buyMembership",
      withCredentials: true,
      data: {
        membershipType: _membershipType,
        userId: uid,
      }
    });

    if (res.statusText == 'OK') {
      localStorage.setItem("membershipType", _membershipType);
      successNotific("Subscribed successfully...");
      setLoader(false);
      window.location.reload();
    }
    else {
      errorNotific("Failed buying subscription...");
      setLoader(false);
    }
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
          {(activeComponent === "login" || activeComponent === "signup") ?
          "" : <SideBar setActiveComponent={setActiveComponent} />
          }
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
                          activeComponent === "pricing" ? (<Pricing errorNotific={errorNotific} successNotific={successNotific} buyMembership={buyMembership} />) :
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
      {/* {
        loader && <div className="new_loader">
          <Loader />
        </div>
      } */}
      <Toaster position="top-right" reverseOrder={false} />
      <Footer />
    </>
  );
};

export default index;
