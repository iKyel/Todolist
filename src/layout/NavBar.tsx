import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="navbar">
        <div className="user">
          <img className="avatar" src="./image/man.png" alt="" />
          <span>Do Xuan Kien</span>
        </div>
        <div className="main-content">
          <ul>
            <li>
              <Link to="/" className="nav-link">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link to="/list" className="nav-link">
                Danh sách công việc
              </Link>
            </li>
            <li>
              <Link to="/create" className="nav-link">
                Tạo công việc mới
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
