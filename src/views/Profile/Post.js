import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export const Post = props => {
  return <Styles.Img src={props.src} alt="" />;
};

Post.propTypes = {
  src: PropTypes.string
};

const Styles = {};

Styles.Img = styled.img`
  width: 293px;
  height: 293px;
  object-fit: cover;
  border-radius: 5px;
`;
