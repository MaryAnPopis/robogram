import React, { Component } from "react";
import styled from "styled-components";

class Error extends Component {
  render() {
    return (
      <Styles.Div>
        <h1>Page not found</h1>
      </Styles.Div>
    );
  }
}

export default Error;

const Styles = {};

Styles.Div = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
