import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./User/UserContext";

const HomePage = () => {
  const [username, setUsername] = useState<string | null>(null);
  const userStore = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await userStore.getCurrentUserProfile();
        setUsername(profile.data.fullName);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchProfile();
  }, [userStore]);

  return (
    <div className="home">
      <h1>To do list đơn giản bằng React + Typescript</h1>
      {username ? (
        <h2>Chào mừng {username}!</h2>
      ) : (
        <div>
          <Link to="/register">
            <h2>Tạo tài khoản tại đây!</h2>
          </Link>
          <Link to="/login">
            <h2>Đăng nhập ở đây!</h2>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
