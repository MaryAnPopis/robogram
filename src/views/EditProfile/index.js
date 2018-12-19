import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import globalVariables from "../../styles/variables";
import Navbar from "../../components/Navbar";
import { Button } from "../../components/Button";
import { patch, getById } from "../../services";
import Loader from "../../components/Loader";
import { Label } from "../../components/Label";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: props.match.params.idUser,
      fullname: "",
      username: "",
      email: "",
      avatar: "",
      password: "",
      fetchInProgress: false,
      checkData: "",
      redirect: false
    };
    this.getFileKey = this.getFileKey.bind(this);
    getById("users", this.state.idUser)
      .then(data => {
        if (data[0] == undefined) {
          this.setState({ checkData: data[0] });
        } else {
          this.setState({
            name: data[0].fullname,
            username: data[0].username,
            email: data[0].email,
            password: data[0].password,
            avatar: data[0].avatar
          });
        }
      })
      .catch(err => {
        throw err;
      });
  }

  onDrop(acceptedFile) {
    this.setState({
      image: acceptedFile[0],
      accepted: acceptedFile.map(file =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    });
  }

  getFileKey(file) {
    `${file.name}_${file.size}`;
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    // prevent the form submmiting on its own
    event.preventDefault();
    this.setState({
      fetchInProgress: true
    });
    const usernameLowecase = this.state.username;
    const data = {
      id: this.state.idUser,
      fullname: this.state.name,
      username: usernameLowecase.toLowerCase(),
      password: this.state.password,
      email: this.state.email
    };

    patch(`users/${data.id}`, data)
      .then(postData => {
        this.setState({
          redirect: true
        });
        postData.serverStatus;
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    return (
      <Styles.Profile>
        {this.state.redirect ? (
          <Redirect to={`/profile/${this.state.idUser}`} />
        ) : (
          this.state.fetchInProgress && <Loader />
        )}
        <div style={this.state.fetchInProgress ? hidden : { display: "block" }}>
          <Navbar url={`/profile/${this.state.idUser}`} />
          <div className="container">
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center mt-5">
                <Styles.FormContainer className="rounded shadow bg-white mb-5">
                  <Styles.Title className="mb-4 d-flex justify-content-center p-2">
                    <h4>Edit user</h4>
                  </Styles.Title>
                  <form className="p-4" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                      <div className="col-md-4">
                        <Styles.Img
                          src={`${this.state.avatar}?size=150x150`}
                          alt=""
                          className=""
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="form-group mb-4">
                          <Label htmlFor="name" labelName="Name" />
                          <Styles.Input
                            name="name"
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Bender Bending"
                            value={this.state.name}
                            onChange={e => this.handleChange(e)}
                          />
                        </div>
                        <div className="form-group mb-4">
                          <Label htmlFor="username" labelName="Username" />
                          <Styles.Input
                            name="username"
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="bender"
                            value={this.state.username}
                            onChange={e => this.handleChange(e)}
                          />
                        </div>
                        <div className="form-group mb-4">
                          <Label htmlFor="email" labelName="Email" />
                          <Styles.Input
                            name="email"
                            type="text"
                            id="email"
                            className="form-control"
                            placeholder="bender@gmail.com"
                            value={this.state.email}
                            onChange={e => this.handleChange(e)}
                          />
                        </div>
                        <div className="form-group mb-4">
                          <Label htmlFor="password" labelName="Password" />
                          <Styles.Input
                            name="password"
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="**********"
                            value={this.state.password}
                            onChange={e => this.handleChange(e)}
                          />
                        </div>
                        <Button name="Send" className="btn" />
                      </div>
                    </div>
                  </form>
                </Styles.FormContainer>
              </div>
            </div>{" "}
          </div>
        </div>
      </Styles.Profile>
    );
  }
}

AddPost.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idUser: PropTypes.string
    })
  })
};

export default AddPost;

const hidden = {
  display: "none"
};

const Styles = {};
const FormContainerWidth = "75%";

Styles.Profile = styled.div`
  background-color: ${globalVariables.bgGrey};
`;

Styles.FormContainer = styled.div`
  width: ${FormContainerWidth};
`;

Styles.Title = styled.div`
  height: 47px;
  background-color: ${globalVariables.darkblue};
  color: ${globalVariables.light};
  border-radius: 0.25rem 0.25rem 0 0;
`;

Styles.Input = styled.input`
  border-color: ${globalVariables.darkblue} !important;
  border-width: 1.2px;
`;
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
