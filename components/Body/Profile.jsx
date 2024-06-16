import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

const Profile = ({ errorNotific, successNotific }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    profilePicture: "",
    privateKey: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
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
        // console.log(ImgHash);
        setUserDetails({ ...userDetails, profilePicture: ImgHash });
        successNotific("Image successfully uploaded to IPFS");
      } catch (error) {
        errorNotific("Error uploading image to IPFS");
        console.log(error);
      }
    } else {
      errorNotific("Please select a file to upload");
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadToIPFS();
    }
  }, [selectedFile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const { name, email, address, profilePicture, privateKey } = userDetails;
    if (!name || !email || !address || !profilePicture || !privateKey) {
      errorNotific("Please fill all details");
      return;
    }

    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    setIsEditing(false);
    successNotific("Profile updated successfully");
  };

  const handleCancel = () => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(storedUserDetails);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">User Profile</h2>
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
        {userDetails.profilePicture && (
          <img
            src={userDetails.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
        )}
        <div className="w-full flex flex-col md:flex-row justify-between mb-4">
          <div className="w-full md:w-1/2 p-2">
            <label className="block text-gray-400 mb-2">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            ) : (
              <p className="text-white">{userDetails.name}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 p-2">
            <label className="block text-gray-400 mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            ) : (
              <p className="text-white">{userDetails.email}</p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between mb-4">
          <div className="w-full md:w-1/2 p-2">
            <label className="block text-gray-400 mb-2">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            ) : (
              <p className="text-white">{userDetails.address}</p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between mb-4">
          <div className="w-full md:w-1/2 p-2">
            <label className="block text-gray-400 mb-2">Private Key</label>
            {isEditing ? (
              <input
                type="text"
                name="privateKey"
                value={userDetails.privateKey}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            ) : (
              <p className="text-white">{userDetails.privateKey}</p>
            )}
          </div>
          {isEditing && (
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={handleDrop}
              className={`w-full md:w-1/2 border-dashed border-4 p-4 mb-4 text-center ${isDragging ? 'border-purple-600' : 'border-gray-600'} rounded-lg bg-gray-700 text-gray-400`}
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
          )}
        </div>
        {isEditing ? (
          <div className="w-full flex justify-between mt-4">
            <button
              onClick={handleSave}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 mt-4"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
