import React, { Component } from "react";
import styled from "styled-components";
import globalVariables from "../../styles/variables";
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from "react-router-dom";

import { post } from "../../services";
import { Button } from "../../components/Button";
import AvatarSignUp from "../../components/AvatarSignUp";
import { Label } from "../../components/Label";

const emailRegex = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === "" && (valid = false);
  });

  //Validate if the form errors are empty
  Object.values(formErrors).forEach(val => {
    val.lengh > 0 && (valid = true);
  });
  return valid;
};

const checkErrors = (formErrors, name, value) => {
  switch (name) {
    case "name":
      formErrors.name = value.length > 0 ? "" : "you need to type in a name";
      break;
    case "username":
      formErrors.username =
        value.length > 0 ? "" : "you need to type in a username";
      break;
    case "password":
      formErrors.password =
        value.length < 6 ? "minimum 6 charachaters required" : "";
      break;
    case "email":
      formErrors.email =
        emailRegex.test(value) && value.length > 0
          ? ""
          : "invalid email address";
      break;
    default:
      break;
  }
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      email: "",
      formErrors: {
        name: "",
        username: "",
        password: "",
        email: ""
      },
      redirect: false,
      insertId: 0
    };
  }

  handleChange(e) {
    let formErrors = this.state.formErrors;
    const { name, value } = e.target;
    checkErrors(formErrors, name, value);
    this.setState({ formErrors, [name]: value });
  }

  handleSubmit(event) {
    // prevent the form submmiting on its own
    event.preventDefault();
    let usernameLowecase = this.state.username;
    usernameLowecase.toLowerCase();
    let data = {
      fullname: this.state.name,
      username: usernameLowecase,
      password: this.state.password,
      email: this.state.email,
      avatar: `https://robohash.org/${usernameLowecase}?size=150x150`
    };
    if (formValid(this.state)) {
      post("users", data)
        .then(data => {
          this.setState({ redirect: true, insertId: data.insertId });
        })
        .catch(err => {
          throw err;
        });
    } else {
      toast.error("🤖 There is an error in your form!", {
        position: "bottom-right",
        autoClose: 5000
      });
    }
  }

  render() {
    const redirect = this.state.redirect;

    if (redirect) {
      return <Redirect to={`/profile/${this.state.insertId}`} />;
    }
    return (
      <Styles.Login>
        <ToastContainer />
        <AvatarSignUp />
        <Styles.Title className="text-center mt-3">
          Welcome to the largest robot community
        </Styles.Title>
        <Styles.Subtitle className="text-center mb-5">
          We hope you are not a human
        </Styles.Subtitle>
        <form onSubmit={this.handleSubmit.bind(this)}>
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
            {this.state.formErrors.name.length > 0 && (
              <small className="form-text text-danger ">
                {this.state.formErrors.name}
              </small>
            )}
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
            {this.state.formErrors.username.length > 0 && (
              <small className="form-text text-danger ">
                {this.state.formErrors.username}
              </small>
            )}
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
            {this.state.formErrors.email.length > 0 && (
              <small className="form-text text-danger ">
                {this.state.formErrors.email}
              </small>
            )}
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
            {this.state.formErrors.password.length > 0 && (
              <small className="form-text text-danger ">
                {this.state.formErrors.password}
              </small>
            )}
          </div>
          <Button name="Sign up" className="btn btn-block" />
          <small className="text-center">
            Already a member? <a href="/">Sign in</a>
          </small>
        </form>
      </Styles.Login>
    );
  }
}

export default SignUp;

const Styles = {};

Styles.Login = styled.div`
  width: 300px;
  margin: 2% auto;
`;

Styles.Title = styled.h1`
  font-size: 28px;
`;

Styles.Subtitle = styled.h3`
  font-size: 18px;
  font-weight: 300;
`;

Styles.Input = styled.input`
  border-color: ${globalVariables.darkblue} !important;
  border-width: 1.2px;
`;
