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
    <div className={styles.signupContainer}>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Signup</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </div>
        <button className={styles.submitButton} type="submit">Sign Up</button>
        <div className={styles.loginLink}>
          <p>Already have an account? <a className={styles.loginButton} onClick={() => props.setActiveComp('login')}>Login</a></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
