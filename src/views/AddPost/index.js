import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import globalVariables from "../../styles/variables";
import Navbar from "../../components/Navbar";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: props.match.params.idUser,
      fetchInProgress: true,
      checkData: ""
    };
  }
  render() {
    return (
      <Styles.Profile>
        <Navbar url={`/profile/${this.state.idUser}`} />
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center">
              <Styles.FormContainer className="rounded shadow bg-white p-4">
                <form action="">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="The best post ever 🤖"
                    />
                  </div>
                </form>
              </Styles.FormContainer>
            </div>
          </div>{" "}
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

const Styles = {};

Styles.Profile = styled.div`
  background-color: ${globalVariables.bgGrey};
`;

Styles.FormContainer = styled.div`
  width: 800px;
`;
