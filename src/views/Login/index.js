import React, { Component } from "react";
import styled from "styled-components";

import globalVariables from "../../styles/variables";
import { Label } from "../../components/Label";
import { Button } from "../../components/Button";
import AvatarLogin from "../../components/AvatarLogin";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ username: "", password: "" });
  }
  render() {
    return (
      <Styles.Login>
        <AvatarLogin />
        <Styles.Title className="text-center mt-3">Welcome back!</Styles.Title>
        <Styles.Subtitle className="text-center mb-5">
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
          <Button name="Sign in" className="btn btn-block" />
          <small className="text-center">
            Not a member yet? <a href="/signup">Sign up</a>
          </small>
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
