
import { FaRegUser } from "react-icons/fa6";
import "./Header.css";
import {  Dropdown, message } from "antd";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  const logOutFunc = () => {
    message.success("You are logged out!");
    setTimeout(() => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("userName");
      navigate("/login");
    }, 2000);
  };

  const items = [
    {
      key: "1",
      label: <div onClick={logOutFunc}>LogOut</div>,
    },
  ];

  return (
    <header>
      <div></div>
      <Dropdown menu={{ items }} placement="bottom" arrow>
        <div className="user">
          <div className="user_icon">
            <FaRegUser />
          </div>
          <span>{localStorage.getItem("userName")}</span>
        </div>
      </Dropdown>
    </header>
  );
};

export default Header;
