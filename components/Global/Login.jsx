import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = (props) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return props.errorNotific("Email or password cant be empty...");
    }
    props.successNotific("Please wait... Logging in...");

    try {
      //api logic
      const response = await props.axios({
        method: "POST",
        url: '/api/v1/user/login',
        withCredentials: true,
        data: {
          email: form.email,
          password: form.password,
        }
      });
      if (!response) {
        return props.errorNotific("Invalid email or password");
      }
      else if (response.data.status === "success") {
        const user = response.data.data.user;
        props.successNotific(`Welcome back, ${user.name}.`);
        localStorage.setItem("uid", user._id);
        localStorage.setItem("member", user.membershipType);
        localStorage.setItem("user-token", response.data.token);
      }
      else if (response.data.status === "fail") {
        console.log(response);
        props.errorNotific(response.data.message);
      }
      else console.log(response);
    } catch (error) {
      console.log(error);
      props.errorNotific(error.response.data.message);
    }
  };


  return (
    <div className="flex items-center min-h-screen justify-center bg-gray-900 p-4">
      <form className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
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
        <div className="mb-6">
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
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-md transition duration-300">
          Login
        </button>
        <div className="text-center text-gray-400 mt-4">
          <p>Don't have an account?{' '}
            <span className="text-purple-500 cursor-pointer" onClick={() => props.setActiveComponent('signup')}>Sign Up</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;