import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";
const SideBar = () => {
  return (
    <div
      className="wrapper_sidebar d-flex flex-column w-100"
      style={{ height: "100%" }}
    >
    
      <div className="item-sidebar">
        <Link className="text-warning" to={"/admin/story"}>Story</Link>
      </div>
      <div className="item-sidebar">
        <Link className="text-warning" to={"/admin/user"}>User</Link>
      </div>
    
    </div>
  );
};

export default SideBar;
