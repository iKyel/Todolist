import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const userStore = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !fullName.trim() || !password.trim()) {
      toast.error('Yêu cầu nhập đủ các trường!');
      return;
    }

    try {
      await userStore.registerUser({ username, fullName, password });
      toast.success('Đăng ký thành công!');
      setUsername('');
      setFullName('');
      setPassword('');
      navigate('/');
    } catch (error) {
      toast.error('Đăng ký thất bại');
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="container-register">
      <ToastContainer />
      <div className="create-work-form">
        <h2>Register</h2>
        <form className="form-res" onSubmit={handleSubmit}>
          <input
            type="text"
            className="task-input-res"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="text"
            className="task-input-res"
            placeholder="UserName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="task-input-res"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submit-button">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;