import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import { getById } from "../../services";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { ProfileHeader } from "./ProfileHeader";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      name: "",
      username: "",
      email: "",
      avatar: "",
      fetchInProgress: true,
      checkData: ""
    };
  }
  componentDidMount() {
    let urlId = this.state.id;
    getById("users", urlId)
      .then(data => {
        if (data == undefined) {
          this.setState({ checkData: data });
        } else {
          this.setState({
            fetchInProgress: false,
            name: data.fullname,
            username: data.username,
            email: data.email,
            avatar: data.avatar
          });
        }
      })
      .catch(err => {
        throw err;
      });
  }
  render() {
    return (
      <Styles.Profile>
        {this.state.checkData == undefined ? (
          <Redirect to="/" />
        ) : (
          this.state.fetchInProgress && <Loader />
        )}
        <Navbar url={`/profile/${this.state.id}`} />
        <ProfileHeader
          imgSrc={this.state.avatar}
          username={this.state.username}
          id={this.state.id}
        />
      </Styles.Profile>
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

Styles.Profile = styled.div`
  background-color: #fafafa;
`;
