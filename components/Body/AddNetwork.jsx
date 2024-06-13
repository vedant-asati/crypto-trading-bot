import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const AddNetwork = ({ errorNotific, successNotific }) => {
  const [network, setNetwork] = useState({
    networkName: "",
    rpcURL: "",
    APIKey: "",
    walletAdd: "",
    privateKey: "",
    dispImg: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setNetwork({ ...network, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setSelectedFile(e.dataTransfer.files[0]);
  };

  useEffect(() => {
    if(selectedFile) uploadToIPFS();
  }, [selectedFile]);

  const uploadToIPFS = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        console.log("Uploading image...");

        const res = await axios({
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          method: "POST",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
            pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
            "Content-Type": "multipart/form-data"
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
        console.log(ImgHash);
        setNetwork({ ...network, dispImg: ImgHash });
        successNotific("Image successfully uploaded to IPFS");
      } catch (error) {
        errorNotific("Error uploading image to IPFS");
        console.log(error);
      }
    } else {
      errorNotific("Please select a file to upload");
    }
  };

  const store = () => {
    const { networkName, rpcURL, APIKey, walletAdd, privateKey, dispImg } = network;

    if (!networkName || !rpcURL || !APIKey || !walletAdd || !privateKey || !dispImg) {
      return errorNotific("Kindly fill all details...");
    }

    let networkArr = [];
    if (localStorage.getItem("networks")) {
      networkArr = JSON.parse(localStorage.getItem("networks"));
    }

    networkArr.push(network);
    localStorage.setItem("networks", JSON.stringify(networkArr));
    successNotific("Network successfully added...");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Add Network</h2>
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="networkName">Network Name</label>
          <input
            type="text"
            id="networkName"
            name="networkName"
            value={network.networkName}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="rpcURL">RPC URL</label>
          <input
            type="text"
            id="rpcURL"
            name="rpcURL"
            value={network.rpcURL}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="APIKey">API Key</label>
          <input
            type="text"
            id="APIKey"
            name="APIKey"
            value={network.APIKey}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="walletAdd">Wallet Address</label>
          <input
            type="text"
            id="walletAdd"
            name="walletAdd"
            value={network.walletAdd}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="privateKey">Private Key</label>
          <input
            type="text"
            id="privateKey"
            name="privateKey"
            value={network.privateKey}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        {/* {(<div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="dispImg">Display Image URL</label>
          <input
            type="text"
            id="dispImg"
            name="dispImg"
            value={network.dispImg}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>)} */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={handleDrop}
          className={`border-dashed border-4 p-4 mb-4 text-center ${isDragging ? 'border-purple-600' : 'border-gray-600'} rounded-lg bg-gray-700 text-gray-400`}
        >
          {selectedFile ? (
            <div>{selectedFile.name}</div>
          ) : (
            <div>
              <p>Drag & Drop your file here or click to upload</p>
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded-md transition duration-300"
              >
                Browse Files
              </button>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {/* <button
          onClick={uploadToIPFS}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-md transition duration-300 mb-4"
        >
          Upload File
        </button> */}
        <button
          onClick={store}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-md transition duration-300"
        >
          Add Network
        </button>
      </div>
    </div>
  );
};

export default AddNetwork;
