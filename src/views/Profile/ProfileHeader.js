import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import globalVariables from "../../styles/variables";

export const ProfileHeader = props => {
  return (
    <div className="container mt-3 ">
      <Styles.Row className="row">
        <div className="col-md-3" />
        <div className="col-md-3">
          <Styles.Img src={props.imgSrc} alt="" className="" />
        </div>
        <div className="col-md-3 mt-5">
          <Styles.Username>
            {`@${props.username}`}{" "}
            <Styles.SecondaryButton
              to={`/edit/${props.id}`}
              className="btn btn-outline-dark "
            >
              Edit profile
            </Styles.SecondaryButton>{" "}
          </Styles.Username>
        </div>
        <div className="col-md-3" />
      </Styles.Row>
    </div>
  );
};

ProfileHeader.propTypes = {
  imgSrc: PropTypes.string,
  username: PropTypes.string,
  id: PropTypes.string
};

const Styles = {};

Styles.Img = styled.img`
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

  clip-path: circle(60px at center);
  margin-left: 10%;
`;

Styles.Username = styled.h1`
  font-size: 32px;
  color: ${globalVariables.darkBlue};
  font-weight: 300;
`;

Styles.SecondaryButton = styled(Link)`
  border-color: ${globalVariables.darkblue} !important;
  border-width: 1px;
  color: ${globalVariables.darkblue};
  font-size: 12px;
  text-align: center;
  &:hover {
    background-color: ${globalVariables.darkblue};
  }
  &:focus {
    background-color: ${globalVariables.darkblue};
  }
`;

Styles.Row = styled.div`
  border-bottom: 1.4px solid rgb(167, 167, 167, 0.3);
`;
