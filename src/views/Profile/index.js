import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";

import globalVariables from "../../styles/variables";
import { getById } from "../../services";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { ProfileHeader } from "../../components/ProfileHeader";
import { Post } from "../../components/Post";
import NoPosts from "../../components/NoPosts";

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
      checkData: "",
      posts: []
    };
  }
  componentDidMount() {
    let urlId = this.state.id;
    getById("users", urlId)
      .then(data => {
        if (data[0] == undefined) {
          this.setState({ checkData: data[0] });
        } else {
          this.setState({
            name: data[0].fullname,
            username: data[0].username,
            email: data[0].email,
            avatar: data[0].avatar
          });
        }
      })
      .catch(err => {
        throw err;
      });
    getById("post", urlId)
      .then(data => {
        this.setState({
          fetchInProgress: false,
          posts: data
        });
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
        <Styles.PostContainer className="container p-0">
          <div className="col-md-12 d-flex justify-content-end mt-3 ">
            <Styles.SecondaryButton
              to={`/post/${this.state.id}`}
              className="btn btn-outline-dark "
            >
              Add post
            </Styles.SecondaryButton>
          </div>
        </Styles.PostContainer>
        <Styles.PostContainer className="container">
          <div className="row">
            {this.state.posts.length == 0 ? (
              <div className="col-md-12 d-flex justify-content-center">
                <NoPosts />
              </div>
            ) : (
              this.state.posts.map(post => {
                return (
                  <div
                    className="col-md-4 mt-3 mb-4 d-flex justify-content-center"
                    key={post.id}
                  >
                    <Post
                      key={post.id}
                      src={post.img}
                      username={this.state.username}
                      description={post.description}
                    />
                  </div>
                );
              })
            )}
          </div>
        </Styles.PostContainer>
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
  padding: 0.1rem 0.3rem !important;
  border-color: ${globalVariables.darkblue} !important;
  border-width: 1.4px;
  color: ${globalVariables.darkblue};
  text-align: center;
  font-weight: 600;
  &:hover {
    background-color: ${globalVariables.darkblue};
  }
  &:focus {
    background-color: ${globalVariables.darkblue};
  }
`;

Styles.PostContainer = styled.div`
  width: 935px;
`;
