import React from 'react';
import Map from './MapComponent';
import { Row, Col, Container, Card, CardBody } from 'reactstrap';



function Home(props) {

    const [bounceState, updateBounceState] = React.useState(props.history.map(i => {return (false)}));

    const handleCardClick = (index) => {
        // Create a fully false state to prevent multiple markers from bouncing
        let freshState = bounceState.map(i => false);
        freshState[index] = !bounceState[index];
        updateBounceState([...freshState]);
    }

    const LocationList = props.history.map((i, index) => {
        return (
            <Card key={index} className="mx-auto" onClick={() => handleCardClick(index)}>
                <Container>
                    <Row>
                        <Col xs="2" className="mx-auto my-auto" style={{ backgroundColor: 'yellow' }}>
                            {index}
                        </Col>
                        <Col xs="10" >
                            <CardBody>
                                <div>{i.title}</div>
                                <address>{i.address}<br /> {i.city}, {i.state} {i.zip}</address>
                                <div>On {i.date}</div>
                                <div> @ {i.hours}</div>
                            </CardBody>
                        </Col>
                    </Row>
                </Container>
            </Card>
        );
    });

    return (
        <Container>
            <Row className="mt-5 mb-5">
                <Col xs="12" lg="8">
                    <Map history={props.history} bounce={bounceState}/>
                </Col>
                <Col>
                    {LocationList}
                </Col>
            </Row>
        </Container>
    );
}

export default Home;