import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import globalVariables from "../styles/variables";

export const Button = props => (
  <Styles.Button type="submit" className={props.className}>
    {props.name}
  </Styles.Button>
);

Button.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string
};

const Styles = {};
Styles.Button = styled.button`
  background-color: ${globalVariables.darkblue};
  color: ${globalVariables.light};
`;
