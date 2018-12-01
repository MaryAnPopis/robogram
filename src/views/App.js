import React, { Component } from "react";
import styled from "styled-components";

import Main from "./Main";

class App extends Component {
  render() {
    return (
      <Styles.Container>
        <Main />
      </Styles.Container>
    );
  }
}
export default App;

const Styles = {};

Styles.Container = styled.div``;
