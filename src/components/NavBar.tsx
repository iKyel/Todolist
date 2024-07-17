import "../css_components/NavBar.css";

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
            <li>Trang Chủ</li>
            <li>Danh sách công việc</li>
            <li>Tạo công việc mới</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
