import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import globalVariables from "../styles/variables";

const Navbar = props => {
  return (
    <nav className="navbar navbar-light bg-white">
      <Styles.Link to={props.url}>
        <img
          src=""
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        | Robogram
      </Styles.Link>
    </nav>
  );
};

export default Navbar;

Navbar.propTypes = {
  url: PropTypes.string
};

const Styles = {};

Styles.Link = styled(Link)`
  color: ${globalVariables.darkblue} !important;
`;
