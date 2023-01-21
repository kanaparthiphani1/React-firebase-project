import React from "react";
import { logout } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSession } from "../Context/UserContext";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSession();

  const onHandleLogout = async () => {
    await logout();
    navigate("/signup");
  };

  return user ? (
    <div className="header">
      <img
        className="logo-header"
        src="/images/logos/logo-white.png"
        alt="logo"
      />
      {user && (
        <button
          style={{ float: "right" }}
          onClick={onHandleLogout}
          variant="outline-danger"
        >
          Logout
        </button>
      )}
    </div>
  ) : null;
};

export default Header;
