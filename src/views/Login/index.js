import React, { Component } from "react";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import globalVariables from "../../styles/variables";
import { Label } from "../../components/Label";
import { Button } from "../../components/Button";
import AvatarLogin from "../../components/AvatarLogin";
import { post } from "../../services/index";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", redirect: false, id: "" };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    post("users/autho", data)
      .then(data => {
        data.found
          ? this.setState({ redirect: true, id: data.id })
          : toast.error("🤖 Username or password is invalid!", {
              position: "bottom-right",
              autoClose: 5000
            });
      })
      .catch(err => {
        throw err;
      });
  }
  render() {
    const redirect = this.state.redirect;

    if (redirect) {
      return <Redirect to={`/profile/${this.state.id}`} />;
    }
    return (
      <Styles.Login>
        <ToastContainer />
        <AvatarLogin />
        <Styles.Title className="text-center mt-3">Welcome back!</Styles.Title>
        <Styles.Subtitle className="text-center mb-3">
          Log in to continue
        </Styles.Subtitle>
        <form onSubmit={this.handleSubmit.bind(this)}>
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
            <Label htmlFor="password" labelName="Password" />
            <Styles.Input
              name="password"
              type="password"
              id="password"
              className="form-control"
              placeholder="*******"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <Button name="Sign in" className="btn btn-block mb-2" />
            </div>
            <div className="col-md-6">
              <Styles.SecondaryButton
                to="/signup"
                className="btn btn-outline-dark btn-block"
              >
                Create profile
              </Styles.SecondaryButton>
            </div>
          </div>
        </form>
      </Styles.Login>
    );
  }
}

export default Login;

const Styles = {};

Styles.Login = styled.div`
  width: 300px;
  margin: 2% auto;
`;

Styles.Title = styled.h1`
  font-size: 32px;
`;

Styles.Subtitle = styled.h3`
  font-size: 18px;
  font-weight: 300;
`;

Styles.Input = styled.input`
  border-color: ${globalVariables.darkblue} !important;
  border-width: 1.2px;
`;

Styles.SecondaryButton = styled(Link)`
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
