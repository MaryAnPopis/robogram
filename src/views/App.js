import React, { Component } from "react";
import styled from "styled-components";

import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <Styles.Container>
        <Routes />
      </Styles.Container>
    );
  }
}
export default App;

const Styles = {};

Styles.Container = styled.div``;
