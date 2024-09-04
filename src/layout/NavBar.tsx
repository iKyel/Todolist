import { Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="navbar">
        <div className="user">
          <img className="avatar" src="./image/man.png" alt="Avatar" />
          <span>Do Xuan Kien</span>
        </div>
        <div className="main-content">
          <ul>
            <li>
              <a href="/" className="nav-link">
                Trang Chủ
              </a>
            </li>
            <li>
              <a href="/profile" className="nav-link">
                Tài khoản
              </a>
            </li>
            <li>
              <a href="/list" className="nav-link">
                Danh sách công việc
              </a>
            </li>
            <li>
              <a href="/create" className="nav-link">
                Tạo công việc mới
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
