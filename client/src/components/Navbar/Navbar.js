import React from "react";
import "./Navbar.css";

const Navbar = (props) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  {props.children}
  </nav>
);

export default Navbar;
