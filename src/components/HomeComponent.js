import React from "react";
import Map from "./MapComponent";
import { Row, Col, Container, Card, CardBody } from "reactstrap";
import { Loading } from "./LoadingComponent";
import logo from "../images/logo.png";

function Home(props) {
  const [bounceState, updateBounceState] = React.useState(
    props.history.map(i => {
      return false;
    })
  );

  const handleCardClick = index => {
    // Create a fully false state to prevent multiple markers from bouncing
    let freshState = bounceState.map(i => false);
    freshState[index] = !bounceState[index];
    updateBounceState([...freshState]);
  };

  const NavBar = ({ style }) => {
    return (
      <div className={style}>
        <a href="#sec1">Menu</a>
        <a href="#sec2">Where are we?</a>
        <a href="#sec3">Request a stop</a>
        <a href="#sec4">About Us</a>
      </div>
    );
  };

  const Logo = () => {
    return (
      <img className="logo" src={logo} alt="logo"/>
    );
  };

  const RenderLocationList = ({ history, isLoading, errMess }) => {
    if (isLoading || errMess) {
      return <div />;
    }

    return history.map((i, index) => {
      return (
        <Card
          key={index}
          className="mx-auto"
          onClick={() => handleCardClick(index)}
        >
          <Container>
            <Row>
              <Col
                xs="2"
                className="mx-auto my-auto"
                style={{ backgroundColor: "yellow" }}
              >
                {index}
              </Col>
              <Col xs="10">
                <CardBody>
                  <div>
                    {i.title}
                  </div>
                  <address>
                    {i.address}
                    <br /> {i.city}, {i.state} {i.zip}
                  </address>
                  <div>
                    On {i.date}
                  </div>
                  <div>
                    {" "}@ {i.hours}
                  </div>
                </CardBody>
              </Col>
            </Row>
          </Container>
        </Card>
      );
    });
  };

  {
    /* <Row>
          <Col className="blur-bg" style={{height:"auto", width:"auto"}} xs="12">
            <div className="jumbotron jumbotron-fluid">
              <div>Test text</div>
            </div>
          </Col>
        </Row>
        <Row className="mt-5 mb-5">
          <Col xs="12" lg="8">
            <Map
              history={props.history}
              historyIsLoading={props.historyLoading}
              errMess={props.historyFailed}
              bounce={bounceState}
            />
          </Col>
          <Col>
            <RenderLocationList
              history={props.history}
              isLoading={props.historyLoading}
              errMess={props.historyFailed}
            />
          </Col>
        </Row> */
  }

  return props.historyLoading
    ? <Loading />
    : <div className="home-container">
        <section id="top" className="section-0 sunset">
          <div>
            <Logo />
            <NavBar style="header-navbar" />
          </div>
        </section>
        <section id="sec1" className="section-1 menu-svg">
          <h1>Menu</h1>
          <div className="container" />
        </section>
        <section id="sec2" className="section-2 req-stop-svg">
          <div>
            <h1>Next Stop</h1>
            <Map
              history={props.history}
              historyIsLoading={props.historyLoading}
              errMess={props.historyFailed}
              bounce={bounceState}
            />
          </div>
        </section>
        <section id="sec3" className="section-3">
          <div>
            <h1>Request a stop</h1>
          </div>
        </section>
        <section id="sec4" className="section-4">
          <div>
            <h1>About us</h1>
          </div>
        </section>
      </div>;
}

export default Home;
