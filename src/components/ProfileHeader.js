import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import globalVariables from "../styles/variables";

export const ProfileHeader = props => {
  return (
    <Styles.ProfileHeader className="container mt-3 ">
      <Styles.Row className="row">
        <div className="col-md-3" />
        <div className="col-md-3 mb-4">
          <Styles.Img
            src={`${props.imgSrc}?size=150x150`}
            alt=""
            className=""
          />
        </div>
        <div className="col-md-6 mt-5">
          <Styles.Username>
            {`@${props.username}`}{" "}
            <Styles.SecondaryButton
              to={`/edit/${props.id}`}
              className="btn btn-outline-dark "
            >
              Edit profile
            </Styles.SecondaryButton>{" "}
          </Styles.Username>
          <p>
            <strong>{props.posts}</strong> posts
          </p>
        </div>
      </Styles.Row>
    </Styles.ProfileHeader>
  );
};

ProfileHeader.propTypes = {
  imgSrc: PropTypes.string,
  username: PropTypes.string,
  id: PropTypes.string,
  posts: PropTypes.number
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

  clip-path: circle(70px at center);
  margin-left: 10%;
  margin-bottom: 2%;
`;

Styles.Username = styled.h1`
  font-size: 32px;
  color: ${globalVariables.darkBlue};
  font-weight: 300;
`;

Styles.SecondaryButton = styled(Link)`
  padding: 0.1rem 0.3rem !important;
  border-color: ${globalVariables.darkblue} !important;
  border-width: 1.4px;
  color: ${globalVariables.darkblue};
  text-align: center;
  font-size: 14px;
  font-weight: 600;
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

Styles.ProfileHeader = styled.div`
  width: 935px;
`;
