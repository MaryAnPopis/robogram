import React from "react";
import PropTypes from "prop-types";

export const Label = props => {
  return <label htmlFor={props.htmlFor}>{props.labelName}</label>;
};

Label.propTypes = {
  htmlFor: PropTypes.string,
  labelName: PropTypes.string
};
