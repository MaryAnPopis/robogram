import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import styleVariables from "../styles/variables";
import Modal from "../components/Modal";

export class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }
  render() {
    return (
      <div>
        <Modal
          show={this.state.show}
          handleClose={this.hideModal.bind(this)}
          src={this.props.src}
          username={this.props.username}
          description={this.props.description}
          avatar={this.props.avatar}
        />
        <Styles.Button type="button" onClick={this.showModal.bind(this)}>
          <Styles.Img src={this.props.src} alt="" />
        </Styles.Button>
      </div>
    );
  }
}

Post.propTypes = {
  src: PropTypes.string,
  username: PropTypes.string,
  description: PropTypes.string,
  avatar: PropTypes.string
};

const Styles = {};

Styles.Img = styled.img`
  width: 293px;
  height: 293px;
  object-fit: cover;
  border-radius: 5px;
`;

Styles.Button = styled.button`
  cursor: pointer;
  padding: 0;
  border: none;
  background: none;
  border-color: ${styleVariables.bgGrey};
  &:focus {
    outline: 0;
  }
`;
