import React, { Component } from "react";
import styled from "styled-components";

class Loader extends Component {
  render() {
    return (
      <Styles.Div>
        <h1>Loading...</h1>
      </Styles.Div>
    );
  }
}

export default Loader;

const Styles = {};

Styles.Div = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
