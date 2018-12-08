import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";

import globalVariables from "../../styles/variables";
import { getById } from "../../services";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { ProfileHeader } from "./ProfileHeader";
import { Post } from "./Post";

const posts = [
  {
    img:
      "https://cdn.dribbble.com/users/730703/screenshots/3854196/james-gilleard-folio-illustration-gallery-1998-robocop-d.jpg"
  },
  {
    img:
      "https://i.pinimg.com/474x/3a/2f/4d/3a2f4dc97af33628afd0c7271a159c01--cyborg-girl-cyber-punk.jpg"
  },
  { img: "http://todofondos.com/bin/fondos/06/07/89d.jpg" },
  {
    img:
      "https://cdn.dribbble.com/users/1008875/screenshots/4856783/bountyhunter.png"
  },
  {
    img:
      "https://cdn.dribbble.com/users/124813/screenshots/4100704/506_cyberpunk_head-floydworx.png"
  },
  {
    img:
      "https://cdn.dribbble.com/users/1008875/screenshots/4861020/future-farmer.png"
  }
];

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
        <div className="container">
          <div className="col-md-12 d-flex justify-content-end mt-3 mr-4">
            <Styles.SecondaryButton
              to={`/post/${this.state.id}`}
              className="btn btn-outline-dark "
            >
              Add post
            </Styles.SecondaryButton>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {posts.map(post => {
              return (
                <div
                  className="col-md-4 mt-3 mb-4 d-flex justify-content-center"
                  key={post.id}
                >
                  <div className="">
                    <Post src={post.img} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
  background-color: #efefef;
`;
Styles.box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
Styles.SecondaryButton = styled(Link)`
  padding: 0.1rem 0.75rem !important;
  border-color: ${globalVariables.darkblue} !important;
  border-width: 1.4px;
  color: ${globalVariables.darkblue};
  text-align: center;
  font-weight: 400;
  &:hover {
    background-color: ${globalVariables.darkblue};
  }
  &:focus {
    background-color: ${globalVariables.darkblue};
  }
`;
