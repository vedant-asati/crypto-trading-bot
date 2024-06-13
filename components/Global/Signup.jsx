import React, { useState, useEffect, useContext } from 'react';
import styles from './Signup.module.css';

const Signup = (props) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return props.errorNotific("Please fill all details...");
    }
    if (form.password.length < 4) {
      return props.errorNotific("Password should be at least 4 characters...");
    }
    props.successNotific("Please wait... Account getting created...");

    try {
      //api logic
      const response = await props.axios({
        method: "POST",
        url: '/api/v1/user/signup',
        withCredentials: true,
        data: {
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }
      });
      if (response.data.status === "success") {
        const user = response.data.data.user;
        props.successNotific(`Welcome ${user.name}. Account created...`);
        localStorage.setItem("uid", user._id);
        localStorage.setItem("member", user.membershipType);
        localStorage.setItem("user-token", response.data.token);
      }
      else {
        console.log(response);
        props.errorNotific(error.response.data.message);
      }
    } catch (error) {
      console.log(error);
      props.errorNotific(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <form className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-white text-center mb-6">Signup</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-md transition duration-300">
          Sign Up
        </button>
        <div className="text-center text-gray-400 mt-4">
          <p>Already have an account?{' '}
            <span className="text-purple-500 cursor-pointer" onClick={() => props.setActiveComponent('login')}>Login</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;