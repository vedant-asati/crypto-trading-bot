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
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Login</h2>
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
        <button className={styles.submitButton} type="submit">Login</button>
        <div className={styles.signupLink}>
          <p>Don't have an account? <a className={styles.signupButton} onClick={() => props.setActiveComp('signup')} >Sign Up</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
