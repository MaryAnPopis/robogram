import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = props => {
  return (
    <nav className="navbar navbar-light bg-white">
      <Link to={props.url}>
        <img
          src=""
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        | Robogram
      </Link>
    </nav>
  );
};

export default Navbar;

Navbar.propTypes = {
  url: PropTypes.string
};
