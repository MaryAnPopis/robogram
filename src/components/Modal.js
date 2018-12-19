import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Style.Modal
        style={this.props.show ? Style.displayBlock : Style.displayNone}
        onClick={this.props.handleClose}
      >
        <Style.MainModal className="row">
          <div className="col-md-8" style={Style.paddingLeft}>
            <Style.ImgHolder>
              <Style.Img src={this.props.src} alt="" />
            </Style.ImgHolder>
          </div>
          <div className="col-md-4" style={Style.paddingRightLeft}>
            <p className="mt-3 ">
              <span className="font-weight-bold">@{this.props.username}</span>{" "}
              <Style.Comment>{this.props.description} </Style.Comment>
            </p>
          </div>
        </Style.MainModal>
      </Style.Modal>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  src: PropTypes.string,
  username: PropTypes.string,
  description: PropTypes.string
};
export default Modal;

// Styles
const Style = {};

Style.displayBlock = {
  display: "block"
};

Style.displayNone = {
  display: "none"
};

Style.paddingLeft = {
  "padding-left": "0px"
};

Style.paddingRightLeft = {
  "padding-left": "0px",
  "padding-right": "0px"
};

Style.Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
  border-radius: 5px;
  overflow: scroll;
  overflow-x: hidden;
`;

Style.MainModal = styled.div`
  position: relative;
  background: white;
  width: 935px;
  height: 600px;
  top: 55%;
  left: 50%;
  margin: 10px 0 60px 0;
  transform: translate(-50%, -50%);
  border-radius: 5px;
`;

Style.ImgHolder = styled.div``;

Style.Img = styled.img`
  width: 600px;
  height: 600px;
  object-fit: cover;
  border-radius: 5px 0 0 5px;
`;

Style.Comment = styled.p`
  font-size: 14px;
  margin: 0;
  padding: 0;
  display: inline;
`;
