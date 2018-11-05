import React from "react";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <a className="navbar-brand" href="/">
      Dashboard
    </a>
    <a className="navbar-brand" href="/AddProject">
     Create New Gig
    </a>
    <a className="navbar-brand" href="/">
      Logout
    </a>
  </nav>
);

export default Navbar;
