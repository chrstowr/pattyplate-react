import React, { Component } from "react";
import { Button, Label, Col, Row } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;
const isNumber = val => !isNaN(+val);
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class RequestStop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      phoneNum: "",
      email: "",
      agree: false,
      contactType: "By Phone",
      feedback: "",
      touched: {
        firstName: false,
        lastName: false,
        phoneNum: false,
        email: false
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(values) {
    console.log("Current state is: " + JSON.stringify(values));
    alert("Current state is: " + JSON.stringify(values));
  }

  handleBlur = field => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  render() {
    return (
      <div
        className="row"
        style={{
          width: "100vw",
          maxWidth: "750px"
        }}
      >
        <div className="col-md-10">
          <LocalForm onSubmit={values => this.handleSubmit(values)}>
            <Row className="form-group">
              <Label htmlFor="firstName" md={2}>
                First Name
              </Label>
              <Col md={10}>
                <Control.text
                  model=".firstName"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".firstName"
                  show={{ touched: true, focus: true }}
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less"
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="lastName" md={2}>
                Last Name
              </Label>
              <Col md={10}>
                <Control.text
                  model=".lastName"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".lastName"
                  show={{ touched: true, focus: true }}
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less"
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="phoneNum" md={2}>
                Phone
              </Label>
              <Col md={10}>
                <Control.text
                  model=".phoneNum"
                  id="phoneNum"
                  name="phoneNum"
                  placeholder="Phone number"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(10),
                    maxLength: maxLength(15),
                    isNumber
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".phoneNum"
                  show={{ touched: true, focus: true }}
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 10 numbers",
                    maxLength: "Must be 15 numbers or less",
                    isNumber: "Must be a number"
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="email" md={2}>
                Email
              </Label>
              <Col md={10}>
                <Control.text
                  model=".email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  validators={{
                    required,
                    validEmail
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".email"
                  show={{ touched: true, focus: true }}
                  component="div"
                  messages={{
                    required: "Required",
                    validEmail: "Invalid email address"
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 4, offset: 2 }}>
                <div className="form-check">
                  <Label check>
                    <Control.checkbox
                      model=".agree"
                      name="agree"
                      className="form-check-input"
                    />{" "}
                    <strong>May we contact you?</strong>
                  </Label>
                </div>
              </Col>
              <Col md={4}>
                <Control.select
                  model=".contactType"
                  name="contactType"
                  className="form-control"
                >
                  <option>By Phone</option>
                  <option>By Email</option>
                  <option>Either is fine</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="feedback" md={2}>
                Give us some details...
              </Label>
              <Col md={10}>
                <Control.textarea
                  model=".feedback"
                  id="feedback"
                  name="feedback"
                  rows="12"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="primary">
                  Send Request
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </div>
      </div>
    );
  }
}

export default RequestStop;
