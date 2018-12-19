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
      >
        <button
          type="button"
          className="close mr-2"
          aria-label="Close"
          onClick={this.props.handleClose}
        >
          <Style.Close aria-hidden="true" className="h1">
            &times;
          </Style.Close>
        </button>
        <Style.MainModal className="row">
          <div className="col-md-8" style={Style.paddingLeft}>
            <Style.ImgHolder>
              <Style.Img src={this.props.src} alt="" />
            </Style.ImgHolder>
          </div>
          <div className="col-md-4" style={Style.paddingLeft}>
            <div style={Style.username}>
              <Style.Avatar src={`${this.props.avatar}?size=50x50`} alt="" />
              <span className="font-weight-bold">
                @{this.props.username}
              </span>{" "}
            </div>
            <p className="mt-3 ">
              <span className="font-weight-bold">{this.props.username}</span>{" "}
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
  description: PropTypes.string,
  avatar: PropTypes.string
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

Style.username = {
  "padding-bottom": "20px",
  "padding-top": "20px",
  "border-bottom": "1px solid rgb(167, 167, 167, 0.3)"
};

Style.Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
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

Style.Avatar = styled.img`
  background: #ff6e7f; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #bfe9ff,
    #ff6e7f
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #bfe9ff,
    #ff6e7f
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  clip-path: circle(20px at center);
`;

Style.Close = styled.span`
  color: white;
  font-weight: 600;
`;
