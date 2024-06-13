import React, { useState } from 'react';

const SubComponent = ({ setActiveComponent, setActive, active, array, title, isOpen }) => {
  return (
    <div className="m-0 p-0">
      <h2 className={`font-semibold text-gray-300 ${isOpen ? "text-lg" : "text-sm"}`}>{title}</h2>
      <ul className="mt-2">
        {array.map((item, index) => (
          <li key={index} className="transition ease-in-out delay-100 hover:-translate-y-0 hover:scale-105 hover:bg-indigo-500 duration-300" onClick={() => { setActiveComponent(item.name); console.log(item.name); }}>
            <a onClick={() => setActive(item.name)} className={`flex items-center p-2 rounded-md cursor-pointer ${active === item.name ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-600 hover:text-white'}`}>
              <span className="w-6 h-6 mr-3">
                <img src={item.icon} alt="" />
              </span>
              {
                isOpen ? <span className="text-sm">{item.name.toUpperCase()}</span> : ""
              }
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SideBar = ({ setActiveComponent }) => {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(true);

  const arr1 = [
    { name: "home", icon: "img/lighticon/light-14.png" },
    { name: "trade-tokens", icon: "img/lighticon/light-17.png" },
    { name: "top-exchange-tokens", icon: "img/lighticon/light-7.png" },
    { name: "networks", icon: "img/lighticon/light-15.png" }
  ];

  const arr2 = [
    { name: "add-network", icon: "img/lighticon/light-14.png" },
    { name: "trading", icon: "img/lighticon/light-6.png" },
    { name: "price", icon: "img/lighticon/light-16.png" },
    { name: "profile", icon: "img/lighticon/light-4.png" },
    { name: "add-token-pair", icon: "img/lighticon/light-19.png" }
  ];

  const logout = () => {
    localStorage.removeItem("user-token");
    window.location.reload();
  };

  return (
    <div className={`my-5 align-top h-1/2 rounded-2xl flex flex-col bg-gray-900  ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300 ease-in-out sticky top-8 overflow-y-auto`}>
      <div className="rounded-t-2xl flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="flex items-center">
          <a href="#">
            <img src="img/light-logo.png" alt="Logo" className={`transition-opacity duration-300  ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`} />
          </a>
          {/* <a href="#" className="ml-3">
            <img src="img/logo-desktop-mini.png" alt="Mini Logo" />
          </a> */}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          <img src="img/lighticon/light-22.png" alt="Toggle" className={`w-10 transition-transform duration-300 ${isOpen ? ' rotate-180' : 'rotate-0 p-2'}`} />
        </button>
      </div>
      <div className="p-4 overflow-y-auto justify-between">
        <SubComponent
          setActiveComponent={setActiveComponent}
          setActive={setActive}
          active={active}
          array={arr1}
          isOpen={isOpen}
          title="Basic"
        />
        <SubComponent
          setActiveComponent={setActiveComponent}
          setActive={setActive}
          active={active}
          isOpen={isOpen}
          array={arr2}
          title="Tools"
        />
        <div className="mt-4">
          <h2 className={`font-semibold text-gray-300 transition-fade ${isOpen ? "text-lg" : "opacity-0 h-0"}`}>Controls</h2>
          <ul className="mt-2">
            <li onClick={logout}>
              <a href="#" title="Log Out" className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-600 hover:text-white">
                <span className="w-6 h-6 mr-3">
                  <img src="img/lighticon/light-10.png" alt="Log Out" />
                </span>
                {
                  isOpen ? <span className="text-sm">Log Out</span> : ""
                }
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
