import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const userStore = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error('All fields are required');
      return;
    }

    try {
      await userStore.loginUser(username, password);
      toast.success('Đăng nhập thành công!');
      setUsername('');
      setPassword('');
      navigate('/profile'); 
    } catch (error) {
      toast.error('Đăng nhập lỗi!');
      console.error('Error logging in user:', error);
    }
  };

  return (
    <div className="container-login">
      <ToastContainer />
      <div className="login-form">
        <h2>Login</h2>
        <form className="form-login" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-login"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="input-login"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submit-button">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;