import React from "react";

const NavBar = () => {
  return (
    <>
    <div className="user">
        <img src="./image/man.png" alt="" />
        <span>Do Xuan Kien</span>
    </div>
      <div className="main-content">
        <ul>
          <li>Trang Chủ</li>
          <li>Danh sách công việc</li>
          <li>Tạo công việc mới</li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
