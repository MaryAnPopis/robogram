import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import globalVariables from "../../styles/variables";
import { getById } from "../../services";
import Navbar from "../../components/Navbar";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      name: "",
      username: "",
      email: "",
      avatar: ""
    };
  }
  componentDidMount() {
    let urlId = this.state.id;
    getById("users", urlId)
      .then(data => {
        this.setState({
          name: data.fullname,
          username: data.username,
          email: data.email,
          avatar: data.avatar
        });
      })
      .catch(err => {
        throw err;
      });
  }
  render() {
    return (
      <div>
        <Navbar />
        <Styles.Profile className="container mt-3">
          <Styles.Row className="row">
            <div className="col-md-3" />
            <div className="col-md-3">
              <Styles.Img src={this.state.avatar} alt="" className="" />
            </div>
            <div className="col-md-3 mt-5">
              <Styles.Username>
                {`@${this.state.username}`}{" "}
                <Styles.SecondaryButton
                  href={`/edit/${this.state.id}`}
                  className="btn btn-outline-dark "
                >
                  Edit profile
                </Styles.SecondaryButton>{" "}
              </Styles.Username>
            </div>
            <div className="col-md-3" />
          </Styles.Row>
        </Styles.Profile>
      </div>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

export default Profile;

const Styles = {};

Styles.Profile = styled.div``;

Styles.Img = styled.img`
  background: #b92b27; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #1565c0,
    #b92b27
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #1565c0,
    #b92b27
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  clip-path: circle(60px at center);
  margin-left: 10%;
`;

Styles.Username = styled.h1`
  font-size: 32px;
  color: ${globalVariables.darkBlue};
  font-weight: 300;
`;

Styles.SecondaryButton = styled.a`
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
  border-bottom: 1px solid rgb(167, 167, 167, 0.3);
`;
