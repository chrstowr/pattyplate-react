import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import Container from "reactstrap/lib/Container";

class ComponentSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      input: "",
      error: ""
    };
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSubmit(event) {
    this.setState({});
  }

  render() {
    return (
      <Container>
        <Row />
        <Row>
          <form onSubmit={this.handleSubmit}>
            <label>
              Order:
              <input
                type="text"
                value={this.state.input}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Row>
      </Container>
    );
  }
}

export default ComponentSort;
