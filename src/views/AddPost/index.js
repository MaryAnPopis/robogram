import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";

import globalVariables from "../../styles/variables";
import Navbar from "../../components/Navbar";
import { Button } from "../../components/Button";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: props.match.params.idUser,
      img: "",
      description: "",
      fetchInProgress: true,
      checkData: "",
      accepted: [],
      dragOverStatus: null,
      ref: (this.ref = React.createRef())
    };
    this.getFileKey = this.getFileKey.bind(this);
  }

  onDrop(acceptedFiles) {
    this.setState({
      img: acceptedFiles[0],
      accepted: acceptedFiles.map(file =>
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

  componentWillUnmount() {
    this.state.accepted.forEach(file => {
      window.URL.revokeObjectURL(file.preview);
    });
  }
  render() {
    return (
      <Styles.Profile className="mb-5">
        <Navbar url={`/profile/${this.state.idUser}`} />
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center mt-5">
              <Styles.FormContainer className="rounded shadow bg-white ">
                <Styles.Title className="mb-4 d-flex justify-content-center p-2">
                  <h4>Add post</h4>
                </Styles.Title>
                <form action="" className="p-4">
                  <div className="mb-4">
                    <DropZone
                      ref={this.state.ref}
                      accept="image/*"
                      onDrop={this.onDrop.bind(this)}
                      onDragOver={(...args) => {
                        [...args];
                      }}
                    >
                      {this.state.accepted.map(file => {
                        return (
                          <img
                            key={file.name}
                            src={file.preview}
                            style={{ height: 150 }}
                            alt=""
                          />
                        );
                      })}
                      <div>
                        <div
                          className="row mb-5 mt-5"
                          style={
                            this.state.img == "" ? { display: "block" } : hidden
                          }
                        >
                          <div className="col-md-12 d-flex justify-content-center ">
                            <svg width={174} height={95} fill="none">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M113.03 0c-16.1 0-29.513 10.769-32.2 24.964-23.073-14.685-55.806-.489-55.806 26.922-33.269 0-31.122 42.586-1.073 42.586h55.274v-23.5h-13.95l27.9-34.754 28.438 34.754h-13.948v23.5H140.4c40.244 0 45.074-53.845 5.366-59.719C148.982 16.643 133.421 0 113.03 0z"
                                fill="#D7D7D7"
                              />
                            </svg>
                          </div>
                          <div className="col-md-12 d-flex justify-content-center">
                            <strong>Drag & drop an image</strong>
                          </div>
                        </div>
                      </div>
                    </DropZone>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="3"
                      placeholder="The best post ever 🤖"
                      onChange={e => this.handleChange(e)}
                    />
                  </div>
                  <Button name="Add robotic post" className="btn" />
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

const hidden = {
  display: "none"
};

const DropZone = styled(Dropzone)`
  padding: 20px;
  border: 2px dashed rgb(112, 112, 112, 0.3);
  border-radius: 5px;
  &.active {
    border-color: #27ae60;
  }
  &.reject {
    border-color: #e74c3c;
  }
`;

DropZone.defaultProps = {
  activeClassName: "active",
  rejectClassName: "reject"
};

const Styles = {};
const FormContainerWidth = "600px";
Styles.Profile = styled.div`
  background-color: ${globalVariables.bgGrey};
`;

Styles.FormContainer = styled.div`
  width: ${FormContainerWidth};
`;

Styles.Title = styled.div`
  width: ${FormContainerWidth};
  height: 47px;
  background-color: ${globalVariables.darkblue};
  color: ${globalVariables.light};
  border-radius: 0.25rem 0.25rem 0 0;
`;
